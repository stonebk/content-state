import draftjs from "draft-js";
import { JSDOM } from "jsdom";

const { convertFromHTML, convertToRaw, ContentState } = draftjs;

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Usage: node index.js <html>");
  process.exit(1);
}

const html = args[0];

const domBuilder = (html) => {
  const dom = new JSDOM(html);
  return dom.window.document.body;
};

const { contentBlocks, entityMap } = convertFromHTML(html, domBuilder);

const contentState = ContentState.createFromBlockArray(
  contentBlocks,
  entityMap
);

const rawContentState = convertToRaw(contentState);

console.log(rawContentState);
