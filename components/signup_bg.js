import Image from 'next/image';

const SignupBg = () => (
  <Image
    src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
    alt="background image"
    layout="fill"
    objectFit="cover"
    quality={100}
  />
);

export default SignupBg;
