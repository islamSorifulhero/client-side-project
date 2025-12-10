import Logo from "../../../components/Logo/Logo";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content py-10 mt-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <div className="mb-4">
                        <Logo />
                    </div>
                    <p className="text-sm">
                        Your trusted garment production & order tracking platform.
                        We ensure transparency, quality and timely delivery.
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="link link-hover">Home</a></li>
                        <li><a href="/all-products" className="link link-hover">All Products</a></li>
                        <li><a href="/about" className="link link-hover">About Us</a></li>
                        <li><a href="/contact" className="link link-hover">Contact</a></li>
                    </ul>
                </div>

                {/* About */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-sm">
                        A modern solution for managing orders, tracking production,
                        and handling garments factory workflow smoothly.
                    </p>
                </div>

            </div>

            {/* Bottom Line */}
            <div className="text-center mt-10 border-t pt-5 text-sm">
                © {new Date().getFullYear()} All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
