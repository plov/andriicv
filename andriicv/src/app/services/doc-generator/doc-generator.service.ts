import { Injectable } from '@angular/core';
import { AlignmentType, Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DocGeneratorService {

  constructor() { }

  generateDoc(content: string): void {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'This is a bold text.',
                  bold: true,
                  size: 24, // Font size in half-points (24 half-points = 12 points)
                }),
                new TextRun({
                  text: ' This is an italic text.',
                  italics: true,
                  size: 24,
                }),
                new TextRun({
                  text: ' This is an underlined text.',
                  underline: {},
                  size: 24,
                }),
                new TextRun({
                  text: ' This is a colored text.',
                  color: 'FF0000', // Hex color code
                  size: 24,
                }),
                new TextRun({
                  text: ' This is a text with a different font.',
                  font: 'Arial',
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: content,
                  size: 24,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'document.docx');
    });
  }
}