import { Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Footer from "../../components/Footer.tsx";

export default function PricingSection() {
  const pricingPlans = [
    {
      title: "Starter",
      price: "$0",
      features: [
        "1 user at once",
        "15 minutes / meeting",
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
  ];

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
          <div className="grid md:grid-cols-2 gap-8">
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
      <Footer />
    </>
  );
}
