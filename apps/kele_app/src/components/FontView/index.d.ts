
// 定义支持的 transform 函数类型
export type TransformFunction =
  | `translate(${string})`            // 如 translate(10px, 20px)
  | `translateX(${string})`           // 如 translateX(50%)
  | `translateY(${string})`           // 如 translateY(10px)
  | `rotate(${string})`               // 如 rotate(45deg)
  | `scale(${number})`                // 如 scale(1.2)
  | `scaleX(${number})`               // 如 scaleX(0.5)
  | `scaleY(${number})`               // 如 scaleY(1.5)
  | `skew(${string})`                 // 如 skew(30deg, 20deg)
  | `matrix(${number},${number},${number},${number},${number},${number})`; // 如 matrix(1, 0, 0, 1, 0, 0)

export interface Txtconfig {
  txt: string,
  color?: string,
  size?: number,
  lineHeight?: number,
  opacity?: number,
  transform?: TransformFunction | TransformFunction[];
  backgroundColor?: string;
  wrap?: boolean;
  height?: number;
  width?: number;
}
export interface FontViewProps {
  backgroundColor?: string;
  txtconfig: Txtconfig[];
}
