import ejs from "ejs";
import fs from "fs";
import html_to_pdf from "html-pdf-node";
import path from "path";
import { questionTypeInput } from "./../components/Disclouser/UserAnswerTemplate/controller";
import { UserAnswerTemplate } from "./../components/Disclouser/UserAnswerTemplate/model";
import { logger } from "./../configs/Logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ToPdf = async (
  userAnswerTemplate: UserAnswerTemplate,
  questions: questionTypeInput[]
) => {
  logger.info(questions);
  console.log(questions[0]);

  const data = questions[0].userAnswer.options.find(
    (item) =>
      item.name ===
      `Inspection reports completed pursuant to the contract of sale or
receipt for deposit.`
  );
  console.log(data ? "checked" : "");

  ejs.renderFile(
    path.join(
      __dirname +
        `/../templates/${userAnswerTemplate.property.state.abbreviation.toLowerCase()}/${
          userAnswerTemplate.questionTemplate.uniqueName
        }.ejs`
    ),
    { questions, userAnswerTemplate },
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
