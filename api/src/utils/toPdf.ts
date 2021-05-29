import ejs from "ejs";
import fs from "fs";
import html_to_pdf from "html-pdf-node";
import path from "path";
import cloudinary from "../configs/Cloudinary";
import { questionTypeInput } from "./../components/Disclouser/UserAnswerTemplate/controller";
import { UserAnswerTemplate } from "./../components/Disclouser/UserAnswerTemplate/model";

export const ToPdf = async (
  userAnswerTemplate: UserAnswerTemplate,
  questions: questionTypeInput[]
) => {
  const originalDate = new Date();
  const date =
    originalDate.getMonth() +
    "/" +
    originalDate.getDate() +
    "/" +
    originalDate.getFullYear();

  ejs.renderFile(
    path.join(
      __dirname +
        `/../templates/${userAnswerTemplate.property.state.abbreviation.toLowerCase()}/${
          userAnswerTemplate.questionTemplate.uniqueName
        }.ejs`
    ),
    { questions, userAnswerTemplate, date },
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      const options = { format: "A4" };
      const file = { content: data };
      html_to_pdf.generatePdf(file, options).then((pdfBuffer: string) => {
        const fileName = path.join(
          __dirname + "/../uploads/pdf/" + Date.now().toString() + ".pdf"
        );
        fs.writeFile(fileName, pdfBuffer, async () => {
          try {
            const data = await cloudinary.v2.uploader.upload(fileName, {
              upload_preset: "vbbin7bb",
              format: "pdf",
            });

            userAnswerTemplate.pdfUrl = data.url;
            userAnswerTemplate.save();

            fs.unlink(
              path.join(
                __dirname + "/../uploads/pdf/" + Date.now().toString() + ".pdf"
              ),
              () => {
                return;
              }
            );
          } catch (error) {
            console.log(error);
            return error;
          }
        });
      });
    }
  );
  return;
};
