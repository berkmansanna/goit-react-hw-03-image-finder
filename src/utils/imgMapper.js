export const imgMapper = imgList => {
  return imgList.map(({ id, webformatURL, largeImageURL, tags }) => {
    return { id, webformatURL, largeImageURL, alt: tags };
  });
};
