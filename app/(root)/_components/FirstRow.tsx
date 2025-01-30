import {
  Award, Calculator, FileBarChart, GraduationCap, MessageCircleHeart, Star,
} from 'lucide-react';
import RotatingImage from './RotatingImage';
import TypewriterTextRepeating from './TypewriterTextRepeating';
import FirstRowCard from './FirstRowCard';

const FirstRow = () => (
  <div className="flex flex-col justify-between w-full">
    <div className="flex flex-col lg:flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2 gap-10">
      <TypewriterTextRepeating mobile />
      <div className="relative bottom-14 lg:-bottom-10 xl:bottom-0 h-[30vw] lg:h-[600px] w-full flex justify-center">
        <RotatingImage
          delay={0}
          cardNum="1"
        />
        <RotatingImage
          delay={2500}
          cardNum="2"
        />
        <RotatingImage
          delay={5000}
          cardNum="3"
        />
      </div>
      <div className="flex flex-col mt-16 lg:items-start items-center">
        <TypewriterTextRepeating />
        <div className="grid sm:grid-cols-2 gap-x-3 gap-y-3">
          <FirstRowCard
            header={(
              <>
                <Star className="text-purple-400" />
                Highly-rated
              </>
            )}
            body="Lorem ipsum dolor.."
            delay={3000}
          />
          <FirstRowCard
            header={(
              <>
                <Calculator className="text-purple-400" />
                GPT-4o
              </>
            )}
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit.."
            delay={3100}
          />
          <FirstRowCard
            header={(
              <>
                <Award className="text-purple-400" />
                Award-winning
              </>
            )}
            body="Lorem ipsum dolor sit.."
            delay={3200}
          />
          <FirstRowCard
            header={(
              <>
                <MessageCircleHeart className="text-purple-400" />
                Community
              </>
            )}
            body="Generate quizzes, earn points"
            delay={3200}
          />
          <FirstRowCard
            header={(
              <>
                <GraduationCap className="text-purple-400" />
                Test prep
              </>
            )}
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit.."
            delay={3200}
          />
          <FirstRowCard
            header={(
              <>
                <FileBarChart className="text-purple-400" />
                Create your own
              </>
            )}
            body="Support your organization's goals"
            delay={3200}
          />
        </div>
      </div>
    </div>
  </div>
);

export default FirstRow;
