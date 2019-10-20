import React from 'react';
import { Column } from 'rbx';
import { Footer, Navbar } from './components';
import { Theme } from './components/ThemeSwitch';
export default function Layout({ children }) {
  return (
    <Theme>
      <Column.Group centered>
        <Column
          widescreen={{ size: 9 }}
          desktop={{ size: 9 }}
          tablet={{ size: 12 }}
          mobile={{ size: 12 }}
        >
          <Navbar />
        </Column>
      </Column.Group>
      <main style={{ flex: 1, display: 'flex' }}>{children}</main>
      <Footer />
    </Theme>
  );
}
