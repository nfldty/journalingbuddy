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
  })
  .catch(error => {
      console.error("PSPDFKit loading error:", error.message);
  });
});
