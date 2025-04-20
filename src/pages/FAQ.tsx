import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const faqs = [
        {
            question: "How do I join the MITPA community?",
            answer: "You can join our community by signing up on our website, joining our Discord server, or contributing to one of our open-source projects on GitHub."
        },
        {
            question: "Are all the resources really free?",
            answer: "Yes, all educational resources, practice exams, and community features on MITPA are completely free. We believe in democratizing education for everyone."
        },
        {
            question: "How can I contribute to the project?",
            answer: "You can contribute by creating test questions, reviewing content, translating materials, reporting bugs, suggesting features, or sharing MITPA with others."
        },
        {
            question: "What types of exams are available?",
            answer: "We offer practice exams for various technical certifications, academic subjects, language proficiency tests, and professional qualifications."
        },
        {
            question: "Do I need to create an account to use MITPA?",
            answer: "While some features are available without an account, creating a free account gives you access to track your progress, save exam results, and participate in the community."
        },
        {
            question: "How accurate are the practice exams?",
            answer: "Our exams are created and reviewed by subject matter experts and experienced educators to ensure they closely match the format and difficulty of actual exams."
        }
    ];

    return (
        <section id="faq" className="mitpa-section mt-15">
            <div className="max-w-7xl mx-auto">
                <h2 className="mitpa-heading font-bold text-4xl">FAQ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.slice(0, 3).map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
                                <AccordionTrigger className="text-left hover:text-mitpa-red">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-gray-300">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="w-full">
                        {faqs.slice(3, 6).map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index + 3}`} className="border-b border-white/10">
                                <AccordionTrigger className="text-left hover:text-mitpa-red">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-gray-300">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQ;