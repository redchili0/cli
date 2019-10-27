import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Icons from "./type";
import "./index.css";

interface Sprite {
  model: "sprite";
  type: Icons;
  w: number;
  h: number;
  x: number;
  y: number;
  className?: string;
}

interface Icon {
  model: "icon";
  type: Icons;
  w: number;
  h: number;
  className?: string;
}

export default function ProIcon(props: Sprite | Icon) {
  const w = Taro.pxTransform(props.w);
  const h = Taro.pxTransform(props.h);
  const style = {
    width: w,
    height: h,
    backgroundPosition: props.model === "sprite" ? `${Taro.pxTransform(props.x)} ${Taro.pxTransform(props.y)}` : "0 0",
  };
  return <View style={style} className={`icon--box ${props.type} ${props.className || ''}`} />;
}