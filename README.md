# Image-Processing-API
This api processes images (resize).

### building the api:
first of all run 

```bash
npm install
```

then run the script for building and testing 
```bash
npm run test
```
then use node
```bash
node ./build/.
```
to start the server on port 3000

### how to use :

query in the url /api/images the filename, height and width. in the filename you will specify the name of the image that you want to process in the path build/assets/full then the processed image will be saved in build/assets/thumb.
