import { useState } from 'react';
import { PrintBook } from './PrintBook';

type Html2Canvas = (
  element: HTMLElement,
  options?: Record<string, unknown>,
) => Promise<HTMLCanvasElement>;

type JsPdfInstance = {
  addPage: () => void;
  addImage: (
    imageData: string,
    format: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void;
  save: (filename: string) => void;
};

type JsPdfConstructor = new (options?: Record<string, unknown>) => JsPdfInstance;

type PdfWindow = Window & {
  html2canvas?: Html2Canvas;
  jspdf?: {
    jsPDF?: JsPdfConstructor;
  };
};

export function PdfDownloadButton() {
  const [busy, setBusy] = useState(false);
  const [renderBook, setRenderBook] = useState(false);

  const download = async () => {
    if (busy) return;
    setBusy(true);
    setRenderBook(true);

    try {
      await document.fonts.ready;
      await nextPaint();
      await nextPaint();

      const book = document.getElementById('pdf-book');
      if (!book) throw new Error('PDF 전용 문서를 만들지 못했습니다.');

      const pdfWindow = window as PdfWindow;
      const html2canvas = pdfWindow.html2canvas;
      const JsPdf = pdfWindow.jspdf?.jsPDF;
      if (!html2canvas || !JsPdf) {
        throw new Error('PDF 변환 모듈을 불러오지 못했습니다. 네트워크 연결을 확인해 주세요.');
      }

      const chapters = Array.from(book.querySelectorAll<HTMLElement>('.pdf-chapter'));
      if (chapters.length === 0) throw new Error('PDF에 넣을 내용이 없습니다.');

      const pdf = new JsPdf({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      let hasPage = false;

      for (const chapter of chapters) {
        const canvas = await html2canvas(chapter, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: 794,
          scrollX: 0,
          scrollY: 0,
        });

        const pageWidthMm = 210;
        const pageHeightMm = 297;
        const pagePixelHeight = Math.max(
          1,
          Math.floor((canvas.width * pageHeightMm) / pageWidthMm),
        );

        for (let offsetY = 0; offsetY < canvas.height; offsetY += pagePixelHeight) {
          const sliceHeight = Math.min(pagePixelHeight, canvas.height - offsetY);
          const slice = document.createElement('canvas');
          slice.width = canvas.width;
          slice.height = sliceHeight;
          const context = slice.getContext('2d');
          if (!context) throw new Error('PDF 페이지를 그리지 못했습니다.');

          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, slice.width, slice.height);
          context.drawImage(
            canvas,
            0,
            offsetY,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight,
          );

          if (hasPage) pdf.addPage();
          hasPage = true;

          const imageHeightMm = (sliceHeight * pageWidthMm) / canvas.width;
          pdf.addImage(
            slice.toDataURL('image/jpeg', 0.94),
            'JPEG',
            0,
            0,
            pageWidthMm,
            imageHeightMm,
          );
        }
      }

      pdf.save('KSA_3차_면접_Final_Book.pdf');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'PDF 생성 중 오류가 발생했습니다.';
      window.alert(message);
    } finally {
      setRenderBook(false);
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="mode pdf-download"
        onClick={download}
        disabled={busy}
        title="A4 면접 준비 책자를 PDF로 저장"
      >
        {busy ? 'PDF 만드는 중…' : 'PDF 출력'}
      </button>
      {renderBook && (
        <div className="pdf-book-shell">
          <PrintBook />
        </div>
      )}
    </>
  );
}

function nextPaint() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}
