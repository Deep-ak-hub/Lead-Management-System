import React from 'react';
import { Check, Users, Briefcase, TrendingUp, Zap, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router'

export default function Home() {
    return (
        <div className="min-h-screen bg-black">
            <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex justify-between gap-2">
                            <div className="w-10 h-10  bg-primary rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">LeadFlow Pro</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to='/login' className="px-6 py-2 text-white hover:text-purple-300 transition-colors font-medium">
                                Login
                            </Link>
                            <Link to='/request' className="px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow-lg shadow-purple-500/50">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0   blur-3xl"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                            <Zap className="w-4 h-4 text-purple-400" />
                            <span className="text-white text-sm font-medium">Transform Your Lead Management</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Track Every Lead,
                            <br />
                            <span className="text-white">
                                Close Every Deal
                            </span>
                        </h1>
                        <p className="text-xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Manage clients and students effortlessly. Track projects, courses, and opportunities in one powerful platform designed for growth.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-primary duration-300 text-white rounded-xl font-semibold text-lg  shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105">
                                Start Free Trial
                            </button>
                            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-xl text-purple-200">
                        Powerful features designed for both service providers and educators
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/50">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Client & Student Management</h3>
                        <p className="text-purple-200 leading-relaxed">
                            Organize all your contacts in one place. Track clients for projects and students for courses with customizable fields and tags.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/50">
                            <Briefcase className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Project & Course Tracking</h3>
                        <p className="text-purple-200 leading-relaxed">
                            Assign multiple projects to clients or courses to students. Monitor progress, deadlines, and deliverables effortlessly.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/50">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Sales Pipeline Analytics</h3>
                        <p className="text-purple-200 leading-relaxed">
                            Visualize your sales funnel from lead to conversion. Get insights on conversion rates, revenue forecasts, and performance metrics.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/50">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Automated Workflows</h3>
                        <p className="text-purple-200 leading-relaxed">
                            Set up automated follow-ups, reminders, and status updates. Save time with smart automation that works while you focus on closing deals.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16  rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/50">
                            <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Advanced Reporting</h3>
                        <p className="text-purple-200 leading-relaxed">
                            Generate detailed reports on leads, conversions, and revenue. Export data and share insights with your team in real-time.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/50">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Secure & Reliable</h3>
                        <p className="text-purple-200 leading-relaxed">
                            Enterprise-grade security with encrypted data storage. Your leads and sensitive information are always protected and backed up.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-xl text-purple-200">
                        Flexible pricing for businesses of all sizes
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter Plan */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                            <p className="text-purple-300">Perfect for freelancers and small teams</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-bold text-white">$29</span>
                            <span className="text-purple-200 ml-2">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Up to 50 leads</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Client & student management</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Project tracking</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Basic analytics</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Email support</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>1 user account</span>
                            </li>
                        </ul>
                        <button className="w-full px-6 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                            Get Started
                        </button>
                    </div>

                    {/* Professional Plan */}
                    <div className="relative  backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-500 scale-105 shadow-2xl shadow-purple-500/50">
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-6 py-2 text-white text-sm font-bold rounded-full bg-black shadow-lg">
                            MOST POPULAR
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                            <p className="text-purple-300">For growing businesses and agencies</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-bold text-white">$79</span>
                            <span className="text-purple-200 ml-2">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Up to 500 leads</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>All Starter features</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Advanced analytics & reporting</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Automated workflows</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>5 user accounts</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Custom integrations</span>
                            </li>
                        </ul>
                        <button className="w-full px-6 py-4   text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-xl">
                            Get Started
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                            <p className="text-purple-300">For large organizations</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-5xl font-bold text-white">$199</span>
                            <span className="text-purple-200 ml-2">/month</span>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Unlimited leads</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>All Professional features</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Full analytics suite</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Advanced automation</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>24/7 dedicated support</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>Unlimited users</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>API access</span>
                            </li>
                            <li className="flex items-start gap-3 text-purple-200">
                                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <span>White-label option</span>
                            </li>
                        </ul>
                        <button className="w-full px-6 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="relative rounded-3xl p-12 md:p-16 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Lead Management?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of businesses already growing with LeadFlow Pro. Start your 14-day free trial today.
                        </p>
                        <Link to='/request' className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-500 transition-all duration-300 shadow-xl hover:scale-105">
                            Sign up
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}