import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { View } from "react-native"
export const Email = (props: SvgProps) => (
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
        d="m2.068 5.482 8.875 8.876a1.5 1.5 0 0 0 2.008.103l.114-.103 8.869-8.87c.029.11.048.222.058.337L22 6v12a2 2 0 0 1-1.85 1.995L20 20H4a2 2 0 0 1-1.995-1.85L2 18V6c0-.12.01-.236.03-.35l.038-.168ZM20 4c.121 0 .24.01.355.031l.17.039-8.52 8.52-8.523-8.522c.11-.03.224-.05.34-.06L4 4h16Z"
      />
    </Svg>
  </View>
)
