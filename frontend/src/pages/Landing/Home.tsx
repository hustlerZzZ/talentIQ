
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Code, FileText, Users, Check } from "lucide-react";

export default function InterviewPlatform() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="py-6 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-800">
            InterviewPro
          </div>
          <div className="space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button>Sign Up</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Streamline Your Interview Process
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Conduct efficient and insightful interviews with our integrated
          platform designed for small startups.
        </p>
      </div>
      <div className="text-center">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full"
        >
          Start Your Free Trial
        </Button>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      title: "Live MCQ Assessments",
      description:
        "Evaluate candidates quickly with customizable multiple-choice questions in real-time.",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Code className="h-6 w-6 text-green-500" />,
      title: "Interactive Code Editor",
      description:
        "Assess coding skills with our LLM 3.1 powered live code editor for a hands-on experience.",
      bgColor: "bg-green-100",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Collaborative Interviews",
      description:
        "Conduct seamless panel interviews with multi-user support and real-time collaboration.",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-col items-center">
              <div className={`${feature.bgColor} p-3 rounded-full`}>
                {feature.icon}
              </div>
              <CardTitle className="mt-4 text-center">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "InterviewPro has revolutionized our hiring process. The live MCQ assessments and interactive code editor have significantly improved our ability to evaluate candidates efficiently.",
      author: "Sarah Johnson",
      position: "CTO, TechStart Inc.",
    },
    {
      quote:
        "As a small startup, we needed a cost-effective solution for our interviews. InterviewPro not only met our budget but exceeded our expectations in terms of features and ease of use.",
      author: "Mark Thompson",
      position: "HR Manager, InnovateCo",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const pricingPlans = [
    {
      title: "Starter",
      price: "$49",
      features: [
        "Up to 5 users",
        "Basic MCQ assessments",
        "Simple code editor",
      ],
      isPopular: false,
    },
    {
      title: "Pro",
      price: "$99",
      features: [
        "Up to 15 users",
        "Advanced MCQ assessments",
        "LLM 3.1 powered code editor",
        "Collaborative interviews",
      ],
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited users",
        "Custom MCQ assessments",
        "Advanced code editor",
        "Priority support",
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={plan.isPopular ? "border-blue-500" : ""}
            >
              <CardHeader>
                <CardTitle className="text-center">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold mb-4">
                  {plan.price}
                  <span className="text-sm font-normal">/month</span>
                </p>
                <ul className="text-left space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-6 w-full ${
                    plan.isPopular ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                >
                  {plan.title === "Enterprise"
                    ? "Contact Sales"
                    : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "How does the live MCQ assessment work?",
      answer:
        "Our live MCQ assessment allows you to create custom multiple-choice questions that candidates can answer in real-time during the interview. You can track their responses and analyze results immediately.",
    },
    {
      question:
        "Can I customize the code editor for specific programming languages?",
      answer:
        "Yes, our LLM 3.1 powered code editor supports a wide range of programming languages. You can customize the editor settings, including syntax highlighting and auto-completion, for the specific language you're assessing.",
    },
    {
      question: "Is there a limit to the number of interviews I can conduct?",
      answer:
        "The number of interviews you can conduct depends on your chosen plan. Our Starter and Pro plans have soft limits, while our Enterprise plan offers unlimited interviews. Contact our sales team for more details on usage limits.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} InterviewPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
