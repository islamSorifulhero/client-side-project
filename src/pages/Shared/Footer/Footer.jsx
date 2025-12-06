import Logo from "../../../components/Logo/Logo";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content py-10 mt-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo + Info */}
                <div>
                    <div className="mb-4">
                        <Logo></Logo>
                    </div>
                    <p className="text-sm">
                        Your trusted online shop for quality and authentic products.
                        We ensure the best service and support.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="link link-hover">Home</a></li>
                        <li><a href="/all-products" className="link link-hover">All Products</a></li>
                        <li><a href="/about" className="link link-hover">About Us</a></li>
                        <li><a href="/contact" className="link link-hover">Contact</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Support</h3>
                    <ul className="space-y-2">
                        <li><a className="link link-hover">FAQ</a></li>
                        <li><a className="link link-hover">Shipping</a></li>
                        <li><a className="link link-hover">Return Policy</a></li>
                        <li><a className="link link-hover">Help Center</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: support@example.com</li>
                        <li>Phone: +880 1234-567890</li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
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
