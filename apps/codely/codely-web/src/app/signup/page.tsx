import { SignUpFlow } from './flow';

export const metadata = {
  title: 'Sign Up',
  description: 'Create your free Codely account in 3 steps.',
};

export default function SignUpPage() {
  return <SignUpFlow />;
}
