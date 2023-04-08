import { HTMLProps } from "react";

const Container = ({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`container mx-auto ${className} px-8 xl:mt-12 md:px-4`} {...props}>
      {children}
    </div>
  );
};

export default Container;
