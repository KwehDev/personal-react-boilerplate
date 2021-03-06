import * as sentryReact from '@sentry/react';
import { render, screen } from '@testing-library/react';
import { Router } from 'next/router';

import 'whatwg-fetch';

import { MockRouterContext } from '../../../testUtils/router';
import { createMockScope } from '../../../testUtils/sentry';
import { FALLBACK_LANGUAGE } from '../../constants';
import type { AppRenderProps } from '../../pages/_app';
import App, { reportWebVitals } from '../../pages/_app';
import * as sentryUtils from '../../utils/sentry/client';
import type { LayoutCreator } from '../karma/layout';

const title = 'next-karma';

const createDefaultProps = (): AppRenderProps => ({
  Component: () => <h1>{title}</h1>,
  pageProps: {
    karma: {
      auth: {
        session: null,
      },
      cookies: '',
      i18n: {
        locale: FALLBACK_LANGUAGE,
        resources: {},
      },
    },
  },
  router: new Router('/', {}, '', {
    App: () => null,
    Component: () => null,
    initialProps: {},
    isFallback: false,
    pageLoader: undefined,
    subscription: jest.fn(),
    wrapApp: jest.fn(),
  }),
});

describe('<App />', () => {
  beforeEach(() => {
    window.__NEXT_DATA__ = {
      gssp: true,
      gip: false,
      buildId: 'foo',
      page: '/',
      props: {},
      query: {},
    };
  });

  afterAll(() => {
    // @ts-expect-error required for nextjs router to boot
    delete window.__NEXT_DATA__;
  });

  it('renders without crashing given default props', () => {
    render(<App {...createDefaultProps()} />, {
      wrapper: ({ children }) => (
        <MockRouterContext>{children}</MockRouterContext>
      ),
    });

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('supports persistent layouts', () => {
    const content = 'next-karma with persistent layouts';
    const layoutTestId = 'layout';

    function DummyComponent() {
      return <h1>{content}</h1>;
    }

    const withLayout: LayoutCreator = (page) => (
      <main data-testid={layoutTestId}>{page}</main>
    );

    DummyComponent.withLayout = withLayout;

    render(<App {...createDefaultProps()} Component={DummyComponent} />, {
      wrapper: ({ children }) => (
        <MockRouterContext>{children}</MockRouterContext>
      ),
    });

    const contentElement = screen.getByText(content);
    const layoutElement = screen.getByTestId(layoutTestId);

    expect(contentElement).toBeInTheDocument();
    expect(layoutElement).toBeInTheDocument();

    expect(contentElement.parentElement).toBe(layoutElement);
  });

  it('attaches routing breadcrumbs to Sentry', () => {
    const attachRoutingContextSpy = jest.spyOn(
      sentryUtils,
      'attachRoutingContext'
    );

    const setContextSpy = jest.fn();
    const configureScopeSpy = jest
      .spyOn(sentryReact, 'configureScope')
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .mockImplementationOnce((callback) => {
        // eslint-disable-next-line promise/prefer-await-to-callbacks
        callback(createMockScope({ setContext: setContextSpy }));
      });

    render(<App {...createDefaultProps()} />, {
      wrapper: ({ children }) => (
        <MockRouterContext>{children}</MockRouterContext>
      ),
    });

    expect(attachRoutingContextSpy).toHaveBeenCalledTimes(1);
    expect(attachRoutingContextSpy).toHaveBeenCalledWith(expect.any(Router));

    expect(configureScopeSpy).toHaveBeenCalledTimes(1);
    expect(setContextSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        asPath: expect.any(String),
        pathname: expect.any(String),
        query: expect.any(Object),
        route: expect.any(String),
      })
    );
  });
});

describe('reportWebVitals', () => {
  it('attaches context on @sentry/browser', () => {
    const mockMetric = {
      id: '',
      label: '',
      name: '',
      startTime: Date.now(),
      value: 1,
    };

    const setContextSpy = jest.fn();
    const configureScopeSpy = jest
      .spyOn(sentryReact, 'configureScope')
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      .mockImplementationOnce((callback) => {
        // eslint-disable-next-line promise/prefer-await-to-callbacks
        callback(createMockScope({ setContext: setContextSpy }));
      });

    reportWebVitals(mockMetric);

    expect(configureScopeSpy).toHaveBeenCalledTimes(1);
    expect(setContextSpy).toHaveBeenCalledWith(expect.any(String), mockMetric);
  });
});
