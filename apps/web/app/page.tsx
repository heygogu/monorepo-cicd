import Image, { type ImageProps } from "next/image";

import styles from "./page.module.css";
import { prisma } from "@repo/db/client";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className='imgLight' />
      <Image {...rest} src={srcDark} className='imgDark' />
    </>
  );
};

export default async function Home() {
  const users = await prisma.user.findMany();
  return <div className=''>{JSON.stringify(users, null, 2)}</div>;
}
