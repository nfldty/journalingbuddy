document.addEventListener("DOMContentLoaded", () => {
  if (!window.PSPDFKit) {
      console.error("PSPDFKit failed to load. Check if the script is correctly included in index.html.");
      return;
  }

  const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

  PSPDFKit.load({
      container: "#pspdfkit",
      document: "document.pdf",
      baseUrl: baseUrl
    //   toolbarItems: PSPDFKit.defaultToolbarItems.map(item => ({
    //     ...item,
    //     iconSize: 32 // Increase icon size (default is 24)
    // }))
  })
  .then(instance => {
      console.log("PSPDFKit loaded successfully", instance);
      const defaultItems = PSPDFKit.defaultToolbarItems;
        console.log(defaultItems);

        // Get the current items in the toolbar after it's loaded
        const items = instance.toolbarItems;

        // Filter out the toolbar item with the type "ink"
        const filteredItems = items.filter((item) => 
          item.type !== "signature" &&
        item.type !== "zoom-in" &&
        item.type !== "print" &&
        item.type !== "zoom-out" &&
        item.type !== "callout" &&
        item.type !== "document-crop" &&
        item.type !== "link"
      );
        // Set the new toolbar items without the "ink" item
        instance.setToolbarItems(filteredItems);
        const extractAndSendData = () => {
          const totalPage = instance.totalPageCount;

          // Get current timestamp
          const timestamp = new Date().toISOString();

          // Define JSON file format
          const jsonData = [
              {
                  "role": "metadata", 
                  "timestamp": timestamp
              }
          ];

          let fullText = ""; // Store all extracted text

          // Loop through each page and extract text
          const extractTextPromises = [];
          for (let pageIndex = 0; pageIndex < totalPage; pageIndex++) {
              extractTextPromises.push(
                  instance.textLinesForPageIndex(pageIndex).then(textLines => {
                      const pageText = textLines.map(textLine => textLine.contents).join(" "); // Merge text lines
                      fullText += pageText + " "; // Append to full text with spacing
                  }).catch(error => {
                      console.error(`Error extracting text from page ${pageIndex}:`, error);
                  })
              );
          }

          Promise.all(extractTextPromises)
          .then(() => {
            jsonData.push({
              "role": "human",
              "timestamp": timestamp,
              "text": fullText.trim()
            });

            // Send the JSON data to the server
            fetch('http://127.0.0.1:5000/save_json', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
          }).catch(error => {
            console.error("Error during text extraction:", error);
          });
        };

        // Run the extraction every 5 seconds
        setInterval(extractAndSendData, 5000);
  })
  .catch(error => {
      console.error("PSPDFKit loading error:", error.message);
  });
});
