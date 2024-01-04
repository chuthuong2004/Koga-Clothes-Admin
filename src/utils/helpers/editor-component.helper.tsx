
export const Audio = (props: any) => {
    return <audio controls />;
};
export const Video = (props: any) => {
    return <video controls />;
};
export const Media = (props: any) => {
    let media;
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const type = entity.getType();
    const { block, contentState } = props;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    // console.log(type);
    // console.log({data, block, contentState, props});
    if (type === "audio") {
        media = <Audio />;
    } else if (type === "video") {
        media = <Video />;
    } else if (type === "IMAGE") {
        // eslint-disable-next-line jsx-a11y/alt-text
        media = <img {...data} />;
    }
    return media;
};
