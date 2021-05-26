import ejs from "ejs";
import fs from "fs";
import html_to_pdf from "html-pdf-node";
import path from "path";
import { questionTypeInput } from "./../components/Disclouser/UserAnswerTemplate/controller";
import { UserAnswerTemplate } from "./../components/Disclouser/UserAnswerTemplate/model";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ToPdf = async (
  userAnswerTemplate: UserAnswerTemplate,
  questions: questionTypeInput[]
) => {
  console.log(questions);
  console.log(userAnswerTemplate);

  ejs.renderFile(
    path.join(__dirname + "/../templates/ca/transfer.ejs"),
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
  return;
};
