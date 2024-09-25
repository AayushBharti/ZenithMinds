"use client"
import Hero from "@/components/Home/Hero"
import CodeBlocks from "../components/Home/CodeBlocks"
import HighlightText from "../components/Home/HighlightedText"

export default function Home() {
  return (
    <main className="relative max-w-[1400px] dark:bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      {/* font-[family-name:var(--font-geist-mono)] */}
      <Hero />
      <CodeBlocks
        position={"lg:flex-row"}
        heading={
          <div className="font-semibold text-2xl lg:text-4xl sm:w-full">
            Unlock Your <HighlightText text={"coding potential "} />
            with our expertly crafted courses
          </div>
        }
        subheading={
          "Learn from top industry professionals with years of coding experience, committed to helping you master the skills you need."
        }
        ctabtn1={{
          btnText: "Try it yourself",
          linkto: "/signup",
          active: true,
        }}
        ctabtn2={{
          btnText: "Learn more",
          linkto: "/login",
          active: false,
        }}
        codeblock={`app.use(express.json());
        app.post('/submit', async (req, res) => {
          try {
            const result = await processRequest(req.body);
            res.status(200).json(result);
          } catch (error) {
            res.status(500).send('Error processing request');
          }
        });
        app.listen(3000, () => console.log('Server running on port 3000'));`}
        codeColor={"white"}
        backgroudGradient={"grad"}
      />

      <CodeBlocks
        position={"lg:flex-row-reverse"}
        heading={
          <div className="text-4xl font-semibold">
            Start <HighlightText text={"coding in seconds"} />
          </div>
        }
        subheading={
          "Jump right in and start coding from your very first lesson with our immersive hands-on environment."
        }
        ctabtn1={{
          btnText: "Continue Lesson",
          linkto: "/signup",
          active: true,
        }}
        ctabtn2={{
          btnText: "Learn more",
          linkto: "/login",
          active: false,
        }}
        codeblock={`import { Controller, Post, Body } from '@nestjs/common';
          @Controller('submit')
          export class SubmitController {
            @Post()
            async submit(@Body() data: any): Promise<string> {
              try {
                await this.processRequest(data);
                return 'Request processed successfully';
              } catch (error) {
                throw new Error('Error processing request');`}
        codeColor={"pink"}
        backgroudGradient={"grad2"}
      />
    </main>
  )
}
