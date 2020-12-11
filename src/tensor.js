import { load } from '@tensorflow-models/mobilenet';
import { create } from '@tensorflow-models/knn-classifier';

export const processImg = async (imgRef) => {
  const img = imgRef.current;
  const model = await load();
  const activation = model.infer(img, 'chinese-hasky');
  const classifier = create();
  classifier.addExample(activation, '哈士奇');

  const act = model.infer(img, 'i-don');
  const res = await classifier.predictClass(act);
  const classes = ['a', 'b', 'c'];
  const result = classes[res.label]; // res.label is 哈士奇:100%
  return result;
};
