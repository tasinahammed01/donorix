import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer:
        "Healthy individuals aged 18–60, weighing at least 50kg, and not suffering from chronic illnesses can donate blood.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "Men can donate every 3 months, and women every 4 months, ensuring a safe interval between donations.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, we use sterile, disposable equipment to ensure the process is completely safe and hygienic.",
    },
    {
      question: "How long does the donation process take?",
      answer:
        "The entire process takes about 30–45 minutes, including registration, screening, donation, and rest.",
    },
    {
      question: "Can I donate if I recently recovered from an illness?",
      answer:
        "You should wait at least 14 days after recovery from common illnesses (e.g., flu, fever) before donating blood.",
    },
  ];

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-12">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Frequently <span className="text-red-600">Asked Questions</span>
      </motion.h2>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            className="rounded-3xl w-full md:w-[70%] h-full md:h-[50%]"
            src="https://i.ibb.co.com/tw4m46jJ/Screenshot-617.png"
            alt="Blood Donation FAQ"
          />
        </div>

        {/* FAQ Accordion Section */}
        <div className="w-full lg:w-1/2 space-y-3">
          {faqs.map((faq, index) => (
            <div
              className="w-full md:w-[70%] collapse collapse-arrow bg-base-100 border border-base-300"
              key={index}
            >
              <input
                type="radio"
                name="blood-faq"
                defaultChecked={index === 0}
              />

              {/* Animated Title */}
              <motion.div
                className="collapse-title font-semibold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {faq.question}
              </motion.div>

              <div className="collapse-content text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
