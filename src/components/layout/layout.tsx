import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Container } from '../container/container';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.VFC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};
