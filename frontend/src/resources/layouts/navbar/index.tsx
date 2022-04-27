import { Link } from "react-router-dom";
import RouteConstants from "../../../app/constants/route.constants";
import { NavbarOptions } from "./types";

const Navbar: React.FC<NavbarOptions> = ({}) => {
	return (
		<>
			<nav
				id="header"
				className="bg-white fixed w-full z-10 top-0 shadow"
			>
				<div className="w-full container mx-auto flex flex-wrap items-center justify-between my-4">
					<div className="pl-4 md:pl-0 flex">
						<Link
							className="flex items-center text-yellow-600 text-base xl:text-xl no-underline hover:no-underline font-extrabold font-sans ml-10"
							to={RouteConstants.LIST_SELLER}
						>
							<svg
								className="fill-current h-6 inline-block text-yellow-600 mr-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M16 2h4v15a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V0h16v2zm0 2v13a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4h-2zM2 2v15a1 1 0 0 0 1 1h11.17a2.98 2.98 0 0 1-.17-1V2H2zm2 8h8v2H4v-2zm0 4h8v2H4v-2zM4 4h8v4H4V4z" />
							</svg>{" "}
							Seller
						</Link>
						<Link
							className="flex items-center text-yellow-600 text-base xl:text-xl no-underline hover:no-underline font-extrabold font-sans ml-10"
							to={RouteConstants.LIST_CATEGORY}
						>
							<div>
								{" "}
								<i className="fa fa-book"> </i> Category
							</div>
						</Link>
												<Link
							className="flex items-center text-yellow-600 text-base xl:text-xl no-underline hover:no-underline font-extrabold font-sans ml-10"
							to={RouteConstants.LIST_PRODUCT}
						>
							<div>
								{" "}
								<i className="fa fa-star"> </i> Product
							</div>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
