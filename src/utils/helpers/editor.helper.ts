import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export function convertContent(str: string): EditorState {
  const blocksFromHtml = htmlToDraft(str);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState);
}
