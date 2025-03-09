export interface IconEnum {
  name: string,
  desc: string,
  icon: string,
  click: () => void,
}
export interface ExtennalProps {
  extennalList: Array<IconEnum>
}
