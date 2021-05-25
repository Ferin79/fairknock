import ejs from "ejs";
import fs from "fs";
import html_to_pdf from "html-pdf-node";
import path from "path";

export const ToPdf = async () => {
  ejs.renderFile(
    path.join(__dirname + "/../templates/report.ejs"),
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      const options = { format: "A4" };
      const file = { content: data };
      html_to_pdf.generatePdf(file, options).then((pdfBuffer: string) => {
        fs.writeFileSync(
          path.join(
            __dirname + "/../uploads/pdf/" + Date.now().toString() + ".pdf"
          ),
          pdfBuffer
        );
      });
    }
  );
};
