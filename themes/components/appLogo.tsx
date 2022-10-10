import Image from 'next/image';
import logoSvg from '../images/logo/logo.svg';

interface AppLogoProps {
  className?: string;
};
export default function AppLogo(props: AppLogoProps) {
  return (
    <>
      <Image src={logoSvg} alt="logo" className={props.className} />
    </>
  );
}
