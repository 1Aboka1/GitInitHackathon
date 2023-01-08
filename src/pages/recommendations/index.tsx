import {useSession} from "next-auth/react"
import ShowingOffAbs from '../../assets/Showing-off-ab-muscles.webp'
import DumbbelGuy from '../../assets/dumbbell-curls-1.jpg'
import Image from "next/image"
import {ReactElement, ReactNode, useEffect, useState} from "react"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../../components/layouts/home/MainLayout"
import {trpc} from "../../utils/trpc"
import {useRouter} from "next/router"

const Recommendations = () => {
    const { data: session } = useSession()
    const [userId, setUserId] = useState('')
    const router = useRouter()
    useEffect(() => {
	session?.user?.id ? setUserId(session.user.id) : null
    }, [session?.user?.id])
    const userInfo = trpc.auth.getUserInfo.useQuery({ userId: userId })

    const [userPlan, setUserPlan] = useState(<div></div>)
    useEffect(() => {
	if(userInfo.data?.goal) {
	    switch(userInfo.data.goal) {
		case 'MuscleGain':
		    setUserPlan(SkinnyToMuscle)
		    break
		case 'FatLoss':
		    setUserPlan(FatToSlim)
		    break
		case 'Maintanence':
		    setUserPlan(Maintanence)
		    break
	    }
	}
    }, [userInfo.data?.goal])

    return (
	<div className="min-h-screen pt-7 space-y-8 text-white">
	    <div className="space-y-2">
		<h1 className="font-bold text-4xl">Recommendation</h1>
		<p className="text-gray-500">These are nutrition and training recommendations for your particular goal and physique</p>
	    </div>
	    <div>
		{
		    userPlan
		}
	    </div>
	</div>
    )
}

const FatToSlim = (
    <div className="flex flex-col space-y-5">
	<h1 className="text-2xl font-semibold">With a diet and training plan on your side, you can’t fail</h1>
	<div className="whitespace-pre-wrap w-full">
	It’s important – even at this early stage – to realize that a workout guide without a healthy eating plan drastically reduces your chances of achieving your goals.<br/>

While the saying ‘you can’t outrun a bad diet’ isn’t strictly true, you do make things difficult for yourself if you’re relying on just exercise alone to lose weight.<br/>

It’s the same if you focus entirely on your diet too.<br/>

Because without exercise, you’re not taking every opportunity to boost your calorie expenditure or build lean tissue.<br/>

In this plan, we’re hitting you with a double-barreled assault.
<br/>

Nutrition plus exercise.
<br/>

Get your food and activity levels in check and you’ll be fast-tracked to lower body fat and leaner muscles. Your health will improve, as will your stamina, endurance and well-being will be the best they ever have been.
<br/>

It’s that simple.
	</div>
	<h1 className="text-2xl font-semibold">How do you burn calories?</h1>
	<div className="flex flex-row justify-center w-full">
	    <Image src={ShowingOffAbs} alt='showing off abs'/>
	</div>
	<div className="whitespace-pre-wrap w-full">
Much like you get energy coming into your body from different macronutrients, you also burn calories in different ways too:
<br/>
<br/>
<ol>
    <li>1. Basal metabolic rate (BMR): These are the calories your body needs each day just to perform basic functions. Each time your heart contracts or your brain pings messages to your organs, you need energy to do so. BMR also covers the calories you need to maintain muscle mass too.</li>
    <li>2. Exercise: Whether you’re hitting the gym for cardio and weights day, you’re playing sports or you’re heading off for a long run, your body needs energy to burn for fuel.</li>
    <li>3. General activity: Walking, housework, day-to-day tasks, playing with kids and so on all require your body to use calories.</li>
    <li>4. Food absorption: It’s only a small amount of energy, but when you eat food you have to digest and absorb it – and that also means using stored energy.</li>

</ol>
Throughout the day you’re burning calories from all of these.

And together they add up to be your total daily energy expenditure (TDEE).

The key thing for fat loss is that your TDEE is higher than your calorie intake. That way you’re guaranteed to burn fat.
	</div>
	<p className="text-gray-500">Source: <a>https://www.greatestphysiques.com/workouts/best-fat-loss-workout-and-diet-plan/</a></p>
    </div>
)

const Maintanence = (
    <div className="flex flex-col space-y-5">
	<h1 className="text-2xl font-semibold">How do maintain body physique?</h1>
	<div className="whitespace-pre-wrap w-full">
	   Since you are no longer looking to build your muscles, calorie excess is no longer needed. The days of 5-6 meals with perfectly balanced portions of carbohydrates, fats, and proteins are over. Don't get me wrong, you still should want to eat healthy, good foods as you need to support your existing muscle, but you no longer need to eat over your maintenance calories.
<br/>
<br/>
Without these added calories that you have been so used to giving your body, you really do not provide it with the opportunity to get any bigger or stronger. There is even more leeway with the amount of times or the types of foods that you can eat.

<br/>
<br/>
Setting your watch or constantly keeping your eye on the clock for every second hour when you should eat is no longer needed, go ahead and eat the standard three meals a day every so often if you want. You aren't trying to build your body anymore, merely maintain it, so being as strict and as disciplined as you used to be are no longer needed. However, don't take what I said the wrong way!
<br/>
<br/>

You should still be eating healthy most of the time, you just want to avoid calorie surplus! The nutrition aspect of physique maintenance is the most important, because even with an infrequent or less intense workout regimen, if you are still flooding your body with calories, it will respond by utilizing them to build muscle. Just make sure not to eat too few calories, the one thing you don't want to do is lose muscle!     
	</div>
	<p className="text-gray-500">Source: <a>https://www.bodybuilding.com/fun/topicoftheweek133.htm</a></p>
    </div>
)

const SkinnyToMuscle = (
    <div className="flex flex-col space-y-5">
	<h1 className="text-2xl font-semibold">A word on training and nutrition for gaining muscle for skinny people</h1>
	<div className="whitespace-pre-line w-full">Many so called gurus and “experts” will advocate a common prescription for the “hardgainer.” Normally they tout such protocols as eat tons of calories (no matter what it is), train heavy and infrequently with low volume as to avoid overtraining and rest as much as possible oftentimes suggesting many naps and little to no extracurricular activity.
<br/>
<br/>
I say… why?
<br/>
<br/>
If you are considering yourself a “hardgainer” or someone that has a skinny frame and a tough time putting on muscle you have an advantage. Yes, an advantage! You have the ability to be highly active and eat a little more (healthy food) than the average Joe without getting too soft.
<br/>
<br/>
You will recover faster, assimilate protein quicker and therefore become lean and muscular at the same time. Sure, your gains will most likely come slowly but you will steadily build a solid foundation of muscle that will be much easier to maintain later in life.</div>
<div className="w-full justify-center flex flex-row">
<Image src={DumbbelGuy} alt='Dumbbel Guy'/>
</div>
	<h1 className="text-2xl font-semibold">A few training and diet suggestions</h1>
	<div className="whitespace-pre-wrap">
    1. Eat plenty of proteins, complex carbs and fats. Don’t worry too much about differences between foods like white potatoes and sweet potatoes; just be sure to get in plenty of healthy, whole foods.<br/>
    <br/>
    2. Eat often. Eating to support a fast metabolism and a vigorous training program requires a steady supply of muscle-building calories. Hit your caloric marks and meals each and every day.
    <br/>
    <br/>
    3. If you are eating all clean food, allow yourself a cheat meal or two per week. Gaining muscle shouldn’t be a death sentence regarding a stale diet. Have fun and eat some of your favorite foods once in a while.
    <br/>
    <br/>
    4. Don’t go overboard. Just because you have labeled yourself a hardgainer does not give you a green light to go stuff yourself mercilessly. Nutritiously dense foods are not only best for gaining muscle but also for maintaining good overall health.
    <br/>
    <br/>
    5. Train! The ball is in your court. Train hard and train often. Forget training one body part per day – up the ante and train more frequently. You have the ability to recover faster – take advantage of that.
    <br/>
    <br/>
    6. Don’t be afraid of body weight moves. Another falsehood is the notion that you must lift massive amounts of weights loaded on barbells and huge dumbbells in order to pack on mass. To a point, yes, you must put some weight on the bar to grow, but tell me how many people do you see in the gym perform pull-up, push-ups and dips? Do them.
    <br/>
    <br/>
    7. Don’t be afraid to have fun. If you like basketball, play. If you like to add in some running or other extracurricular activities just go ahead and do it. Forget the idea that they will eat into your muscle gains and prevent you from building an impressive physique. As long as you are training with weights and eating properly, any extra work will only add to your performance and health.
    <br/>
    <br/>
    8. Enough yacking about being skinny, let’s look at some eating plans to support your muscle-building efforts and make all those hours in the gym start to payoff. Below are three eating plans for different body weights. These are only examples so adjust as necessary regarding favorite foods and daily schedules.
	</div>
	<p className="text-gray-500">Source: <a>https://www.muscleandstrength.com/articles/skinny-guy-eating-plan-gain-lean-muscle</a></p>
    </div>
)

Recommendations.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <Navbar/>
	    <MainLayout>
	    {page} 
	    </MainLayout>
	    <Footer/>
	</>
    )
}

export default Recommendations
