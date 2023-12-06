import { Nullable } from "@/types/commons";
import { useState } from "react";
import AccordionItem from "../accordion-item/AccordionItem";
import './Accordion.scss'
import { StoreCategory } from "@/types/entities";
const data = [
    {
        question: 'What are accordion components?',
        answer: 'Accordion components are user interface elements used for organizing and presenting content in a collapsible manner. They typically consist of a header, content, and an expand/collapse action.',
    },
    {
        question: 'What are they used for?',
        answer: 'They are commonly employed in various contexts, including FAQs, product descriptions, navigation menus, settings panels, and data tables, to save screen space and provide a structured and user-friendly interface for presenting information or options.',
    },
    {
        question: 'Accordion as a musical instrument',
        answer: 'The accordion is a musical instrument with a keyboard and bellows. It produces sound by air passing over reeds when the player expands or compresses the bellows, used in various music genres.',
    },
    {
        question: 'Can I create an accordion component with a different framework?',
        answer: 'Yes of course, it is very possible to create an accordion component with another framework.',
    }
];

type AccordionProps = {
    items: StoreCategory[]
}
const Accordion = ({items}: AccordionProps) => {
    const [activeIndex, setActiveIndex] = useState<Nullable<number>>(null);

    const handleItemClick = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className='container'>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.name}
                    answer={'12312'}
                    isOpen={activeIndex === index}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    )
};

export default Accordion;