import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
interface IHomeProps extends SvgProps {
  active?: boolean
}
export const Home = ({ active, ...props }: IHomeProps) => active ? (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        fillRule="evenodd"
        d="M18.9 4.638a3.5 3.5 0 0 1 4.2 0l12.25 9.187a3.5 3.5 0 0 1 1.4 2.8V33.25a3.5 3.5 0 0 1-3.5 3.5H8.75a3.5 3.5 0 0 1-3.5-3.5V16.625a3.5 3.5 0 0 1 1.4-2.8L18.9 4.637Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={21}
        x2={21}
        y1={3.938}
        y2={36.75}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#761EFB" />
        <Stop offset={1} stopColor="#6201F8" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h42v42H0z" />
      </ClipPath>
    </Defs>
  </Svg>
) : (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#333"
        fillRule="evenodd"
        d="M18.9 4.638a3.5 3.5 0 0 1 4.2 0l12.25 9.187a3.5 3.5 0 0 1 1.4 2.8V33.25a3.5 3.5 0 0 1-3.5 3.5H8.75a3.5 3.5 0 0 1-3.5-3.5V16.625a3.5 3.5 0 0 1 1.4-2.8L18.9 4.637Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h42v42H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
