import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export function convertContent(str: string): EditorState {
  const blocksFromHtml = htmlToDraft(str);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState);
}

export function draftContent(state: EditorState): string {
  const contentState = convertToRaw(state.getCurrentContent());

  return draftToHtml(contentState);
}
