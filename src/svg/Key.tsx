import * as React from "react"
import { View } from "react-native"
import Svg, { SvgProps, Path } from "react-native-svg"
export const Key = (props: SvgProps) => (
  <View
    style={{
      width: 24,
      height: 24,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      style={{
        position: "absolute",
        right: 0,
        left: 0,
        width: "100%",
        bottom: 0,
        top: 0,
        height: "100%",
        overflow: "visible",
      }}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="#333"
        d="M10.438 4.368a6.5 6.5 0 1 1 2.252 10.66l-.269-.11-.02-.004h-.61v1.578a1.25 1.25 0 0 1-1.122 1.244l-.128.006H8.963v1.578a1.25 1.25 0 0 1-1.122 1.244l-.128.006H3.73a1.01 1.01 0 0 1-1.004-.9l-.006-.11v-2.61c0-.347.12-.683.34-.951l.1-.11 5.5-5.501.01-.037a.25.25 0 0 0-.004-.081 6.495 6.495 0 0 1 1.772-5.902Zm4.242 2.828a1.499 1.499 0 1 0 2.122 2.121 1.5 1.5 0 0 0-2.122-2.121Z"
      />
    </Svg>
  </View>
)
