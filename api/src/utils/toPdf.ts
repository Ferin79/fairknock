import ejs from "ejs";
import pdf from "html-pdf";
import path from "path";

export const ToPdf = async () => {
  ejs.renderFile(
    path.join(__dirname + "/../templates/report.ejs"),
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      const options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        },
      };
      pdf
        .create(data, options)
        .toFile(
          path.join(
            __dirname + "/../uploads/pdf/" + Date.now().toString() + ".pdf"
          ),
          function (err) {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log("File created successfully");
            }
          }
        );
    }
  );
};
