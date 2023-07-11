import Link from 'next/link';
import { RootPath } from '@/app/rootPath';

const Header = () => {
	return (
		<header className="border-b-2 border-gray-light">
			<div className="container mx-auto flex py-4 justify-between">
				<Link className="text-2xl text-gray-300" href={RootPath.Index()}>
					Weather
				</Link>
			</div>
		</header>
	);
};

export default Header;
