import * as React from "react"
import { View } from "react-native"
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg"
export const Arrow = (props: SvgProps) => (
  <View
    style={{
      width: 42,
      height: 42,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={42}
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
      viewBox="0 0 60 60"
      {...props}
    >
      <Path
        fill="url(#paint0_linear_202_156)"
        d="M47.702 32.076c2.013-.945 2.013-3.81-.001-4.753L23.09 15.786c-2.02-.947-4.224.898-3.65 3.054l2.43 9.109h10.302a1.75 1.75 0 0 1 0 3.5H21.87l-2.427 9.11c-.576 2.154 1.63 3.997 3.649 3.052l24.61-11.535Z"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_202_156"
          x1={39.412}
          x2={17.625}
          y1={18.805}
          y2={40.593}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#761EFB" />
          <Stop offset={1} stopColor="#6201F8" />
        </LinearGradient>
      </Defs>
    </Svg>
  </View>
)
