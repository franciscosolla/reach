import * as React from "react"
import { View } from "react-native"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
export const SpeechBubble = (props: SvgProps) => (
  <View
    style={{
      width: 80,
      height: 80,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
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
      viewBox="0 0 80 80"
      {...props}
    >
      <Path
        fill="url(#paint0_linear_202_150)"
        d="M6.667 38.333C6.667 22.143 22.187 10 40 10s33.333 12.143 33.333 28.333c0 16.19-15.52 28.334-33.333 28.334-2.177 0-4.307-.177-6.37-.517-.31.243-.843.683-1.5 1.147C30.233 68.633 27.497 70 23.333 70A3.333 3.333 0 0 1 20 66.667c0-1.834.477-4.114-.313-5.854-7.764-5.07-13.02-13.153-13.02-22.48Z"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_202_150"
          x1={40}
          x2={40}
          y1={10}
          y2={70}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#761EFB" />
          <Stop offset={1} stopColor="#6201F8" />
        </LinearGradient>
      </Defs>
    </Svg>
  </View>
)
