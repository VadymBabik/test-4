import { ReactNode } from 'react';
import localFont from 'next/font/local';
import Providers from '@/Providers/Providers';

import '../assets/styles/globals.scss';
import Header from '@/components/Header/Header';

const myFont = localFont({
	src: '.././assets/fonts/HelveticaNowDisplay-Medium.woff2',
});

interface RootLayoutProps {
	children: ReactNode;
}

export const metadata = {
	title: 'Weather',
	description: 'Weather',
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="en">
			<body style={myFont.style}>
				<Header />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
