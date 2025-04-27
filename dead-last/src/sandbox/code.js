import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { colorUtils, constants, editor, fonts, viewport } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;
const metaphors = [
    {
      id: 1,
      title: "The Dance of the Bees: HCI in Nature",
      description:
        "Just as bees communicate through intricate dances to share vital information, Human-Computer Interaction (HCI) connects users with technology. By understanding user needs and interactions, we can create a harmonious digital ecosystem. Explore how the elegance of nature inspires efficient design and fosters innovation in technology.",
    },
    {
      id: 2,
      title: "Roots That Connect: HCI Inspired by Trees",
      description:
        "Look to the roots of trees, intertwined underground, for inspiration in HCI. Each root represents a different user's need, and together they create a strong foundation for interaction. Just as trees adapt to their environment, we should design adaptive interfaces that meet diverse user requirements, promoting growth and understanding.",
    },
    {
      id: 3,
      title: "The Sprinting Cheetah: HCI for Speed and Efficiency",
      description:
        "The cheetah, the fastest land animal, teaches us about speed and efficiency in HCI. Just as the cheetah optimizes its movements for maximum performance, interface design must prioritize user efficiency without sacrificing experience. Let's explore how fast-paced sports can inspire quicker, user-friendly technology interactions.",
    },
  ];
  
function start() {
  // APIs to be exposed to the UI runtime
  const sandboxApi = {
    // New function to add pages with metaphor content
    addMetaphorPages: () => {
      const inputGeometry = {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
      };

      try {
        for (const metaphor of metaphors) {
          // Add a new page
          const newPage = editor.documentRoot.pages.addPage(inputGeometry);
          const page = editor.context.currentPage;
          const width = page.width;
          const height = page.height;

          const textNode = editor.createText();
          textNode.fullContent.text = metaphor.title;
          textNode.fullContent.applyCharacterStyles({ fontSize: 60 });
          editor.context.insertionParent.children.append(textNode);

          // Set the text node's position to the center of the page
          textNode.setPositionInParent(
            { x: width / 2, y: height / 4 },
            textNode.centerPointLocal
          );

          const descriptionNode = editor.createText();
          descriptionNode.fullContent.text = metaphor.description;
          descriptionNode.fullContent.applyCharacterStyles({ fontSize: 40 });

          editor.context.insertionParent.children.append(descriptionNode);

          // Set the text node's position to the center of the page
          descriptionNode.setPositionInParent(
            { x: width / 2, y: height / 1.5 },
            descriptionNode.centerPointLocal
          );
        }
      } catch (error) {
        console.error("Error adding metaphor pages:", error);
      }
    },

    insertMetaphor: (title,description) => {
        try {
          const page = editor.context.currentPage;
          const width = page.width;
          const height = page.height;

          const textNode1 = editor.createText();
          textNode1.fullContent.text = title;
          textNode1.fullContent.applyCharacterStyles({ fontSize: 60 });
          editor.context.insertionParent.children.append(textNode1);

          // Set the text node's position to the center of the page
          textNode1.setPositionInParent(
            { x: width / 2, y: height / 4 },
            textNode1.centerPointLocal
          );

          const descriptionNode1 = editor.createText();
          descriptionNode1.fullContent.text = description;
          descriptionNode1.fullContent.applyCharacterStyles({ fontSize: 40 });

          editor.context.insertionParent.children.append(descriptionNode1);

          // Set the text node's position to the center of the page
          descriptionNode1.setPositionInParent(
            { x: width / 2, y: height / 1.5 },
            descriptionNode1.centerPointLocal
          );
        }
        catch(e) {
            console.log("Error in insert One: "+ e);
        }
    }
    
  };

  // Expose `sandboxApi` to the UI runtime.
  runtime.exposeApi(sandboxApi);
}

start();
