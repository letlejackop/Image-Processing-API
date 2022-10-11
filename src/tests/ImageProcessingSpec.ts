import path from "path";
import { sharpProcess } from "../middleware/sharpProcess";

describe("3.Testing ImageProcessing sharp function", () => {
    const inputfile = path.join(__dirname, "../assets/full");
    const outputfile = path.join(__dirname, "../assets/thumb");

    const OriginalImagePath = path.join(inputfile, "santamonica" + ".jpg");

    const ProccesedImagePath = path.join(
      outputfile,
      `${"santamonica"}_filename=${"santamonica"}&height=${300}&width=${200}.jpg`,
    );
    it("expect sharpProcess function to work and be resolved", async () => {        

        await expectAsync(sharpProcess(OriginalImagePath,ProccesedImagePath,200,300)).toBeResolved();
    });
    it("expect sharpProcess function to not work and be rejected", async () => {


        await expectAsync(sharpProcess((inputfile+"/santa.jpg"),outputfile+"/santa.jpg",200,300)).toBeRejected();
    });
  });
  
