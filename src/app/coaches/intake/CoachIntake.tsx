"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { baseURL, basicAuth, capitalizeText } from "@/lib/utils";
import { Loader, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CoachIntake = ({ user }: any) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [formType, setFormType] = useState("coach");
  const departments = [
    "Sales & Marketing",
    "Production",
    "Design",
    "Engineering",
    "HR & Training",
  ];
  const areaDomain = [
    "Career Management",
    "Work Life Banlance",
    "Project Management",
    "Lateral Transfers",
  ];
  //intake fields state
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState<File>();
  const [department, setDepartment] = useState("");
  const [about, setAbout] = useState("");
  const [areaDomains, setAreaDomain] = useState("");
  const [experience, setExperience] = useState("");
  const [mentoringPreferences, setMentoringPreferences] = useState("");
  const [coachMentFrameworks, setCoachMentFrameworks] = useState("");
  const [povProgramParticipants, setPovProgramParticipants] = useState("");
  const [problemSolvingApproach, setProblemSolvingApproach] = useState("");
  const [linksReflectingWVpersonal, setLinksReflectingWVpersonal] =
    useState("");
  const [leaderNames, setLeaderNames] = useState("");
  const [linksReflectyouWished, setLinksReflectyouWished] = useState("");
  const [referenceDocs, setReferenceDocs] = useState<File>();
  const [voiceSample, setVoiceSample] = useState("");
  const [coachmentSelect, setCoachMentSelect] = useState("");
  const [participantLevel, setParticipantLevel] = useState("");
  const [coachMentInSameDep, setCochMentInSameDep] = useState("");
  const [outcomeSupported, setOutcomeSupported] = useState("");
  const [hardSkillAreas, setHardSkillAreas] = useState("");
  const [coachMentStyle, setCoachMentStyle] = useState("");
  const [timeCommitmenttoCoaching, setTimeCommitmenttoCoaching] = useState("");

  const [characteristicsRateLows, setCharacteristicsRateLows] = useState("");
  const [characteristicsRateHigh, setCharacteristicsRateHigh] = useState("");

  const createSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      setCreateLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", basicAuth);
      var formdata = new FormData();
      formdata.append("name", name);
      formdata.append("about", about);
      formdata.append("experience", experience);
      //@ts-ignore
      formdata.append("profile_image", profileImage, "coachprofile.jpg");
      formdata.append("department", department);
      formdata.append("area_domain", areaDomains);
      formdata.append("mentoring_preference", mentoringPreferences);
      formdata.append("mentoring_frameworks", coachMentFrameworks);
      formdata.append("dominant_point_of_view", povProgramParticipants);
      formdata.append("problem_solving_approach", problemSolvingApproach);
      formdata.append("youtube_links", linksReflectingWVpersonal);
      formdata.append("admired_leaders", leaderNames);
      formdata.append("article_links", linksReflectyouWished);
      formdata.append(
        "reference_docs",
        //@ts-ignore
        referenceDocs,
        user.given_name + "reference" + referenceDocs?.type
      );
      formdata.append("voice_sample", voiceSample);
      formdata.append("coaching_for_fitment", coachmentSelect);
      formdata.append("coaching_level", participantLevel);
      formdata.append("coach_same_department", coachMentInSameDep);
      formdata.append("supported_outcome", outcomeSupported);
      formdata.append("hard_skill_areas", hardSkillAreas);
      formdata.append("coaching_style", coachMentStyle);
      formdata.append("time_commitment", timeCommitmenttoCoaching);
      formdata.append("is_data_flow_to_dir", "No");

      formdata.forEach((val, key) => {
        console.log(key, " : ", val);
      });

      fetch(`${baseURL}/accounts/`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_context: {
            name: user.id,
            role: "member",
            user_attributes: {
              tag: "deepchat_profile",
              attributes: {
                username: user.given_name,
                email: user.email,
              },
            },
          },
          identity_context: {
            identity_type: "deepchat_unique_id",
            value: user.email,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          formdata.append("user_id", data.uid);
          formdata.append("email", user.email);

          var myHeaders = new Headers();
          myHeaders.append("Authorization", basicAuth);
          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
          };
          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              setCreateLoading(false);
              toast.success("Successfully created your coach profile.");
            })
            .catch((error) => {
              console.log("error", error);
              toast.error(
                "Error creating your coach profile. Please try again."
              );
            });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <MaxWidthWrapper className="flex pt-10 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <Tabs
          defaultValue="coachee"
          value={formType}
          onValueChange={(val) => {
            setFormType(val);
          }}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="coach">Coach / Mentor</TabsTrigger>
            <TabsTrigger value="coachee">Cochee / Mentee</TabsTrigger>
          </TabsList>
          <TabsContent
            value="coach"
            className="flex justify-center items-center"
          >
            <div className="bg-white w-[60%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-20">
              <h1 className="text-xl text-left text-gray-600 font-bold">
                Coach & Mentor Intake
              </h1>
              <p className="mb-3 text-left text-sm text-gray-600">
                Information provided will be used to create your avatar! ( Est
                time : 15 mins)
              </p>
              <form
                className="text-left"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  createSubmitHandler(e);
                }}
              >
                <div>
                  <div className="my-3">
                    <p className="text-sm my-1">Enter your name</p>
                    <input
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add a profile description.
                    </p>
                    <textarea
                      required
                      onChange={(e) => {
                        setAbout(e.target.value);
                      }}
                      placeholder="Guidance and support through personalized strategies, fostering growth, and unlocking potential to achieve your goals and aspirations effectively..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Total number of years of experience.
                    </p>
                    <div>
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setExperience(value);
                        }}
                      >
                        {[
                          "0 - 5 years",
                          "5 - 10 years",
                          "10 - 20 years",
                          "20+ years",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Which department/ business unit you belong to?
                    </p>
                    <RadioGroup
                      required
                      onValueChange={(value) => {
                        setDepartment(value);
                      }}
                    >
                      {departments.map((val, i) => (
                        <div className="flex items-center space-x-2 ">
                          <RadioGroupItem value={val} id={`r${i}+1`} />
                          <label
                            htmlFor={`r${i}+1`}
                            className="text-xs text-gray-700"
                          >
                            {capitalizeText(val)}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="my-3">
                    <p className="text-sm my-1">
                      Select the area/domain that you are most passionate about
                      coaching and mentoring.
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setAreaDomain(value);
                        }}
                      >
                        {areaDomain.map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="text-sm my-1">
                      Please add a professional picture to be added with your
                      profile.
                    </p>
                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        required
                        type="file"
                        name="myImage"
                        accept="image/*"
                        onChange={(e) => {
                          //@ts-ignore
                          setProfileImage(e.target.files[0]);
                        }}
                        className="w-fit"
                      />{" "}
                    </div>
                  </div>

                  <div className="my-3">
                    <p className="text-sm my-1">
                      Which way do you want to help the program participants the
                      most?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setMentoringPreferences(value);
                        }}
                      >
                        {[
                          "Mentoring (Skills Enhancement)",
                          "Coaching (Reflection)",
                          "Both",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please mention any coaching & mentoring frameworks or
                      tools that you use in your approach.
                    </p>
                    <div>
                      <input
                        required
                        onChange={(e) => {
                          setCoachMentFrameworks(e.target.value);
                        }}
                        placeholder="eg : GROW model"
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please articulate your dominant point of view which you
                      want to discuss with the program participants as a general
                      starting point.
                    </p>
                    <div>
                      <input
                        required
                        onChange={(e) => {
                          setPovProgramParticipants(e.target.value);
                        }}
                        placeholder="Growth in any role will come from seeking challenges (etc.)....."
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What is your general approach towards problem solving?
                    </p>
                    <div>
                      <input
                        required
                        onChange={(e) => {
                          setProblemSolvingApproach(e.target.value);
                        }}
                        placeholder="Growth in any role will come from seeking challenges (etc.)....."
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter 1-2 YouTube links that reflect your worldview
                      on personal & professional development.
                    </p>
                    <div>
                      <textarea
                        rows={4}
                        required
                        onChange={(e) => {
                          setLinksReflectingWVpersonal(e.target.value);
                        }}
                        placeholder="(Let's say you believe grit and perseverance are important for workplace success, you may consider adding this link: https://www.youtube.com/watch?v=H14bBuluwB8 )"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400  resize-none"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add names of 1-2 well-known leaders that you
                      admire.
                    </p>
                    <div>
                      <input
                        required
                        onChange={(e) => {
                          setLeaderNames(e.target.value);
                        }}
                        placeholder="BJCXK"
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter 1-2 article links that reflect what you
                      wished everyone would follow in their growth journey.
                    </p>
                    <div>
                      <textarea
                        rows={4}
                        required
                        onChange={(e) => {
                          setLinksReflectyouWished(e.target.value);
                        }}
                        placeholder="(Let's say you came across an article that you liked a lot and you think it will help the program participants to grow, you can add that link. E.g you want to generally talk about empathy, you can add this article: https://www.mindtools.com/agz0gft/empathy-at-work)"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                      />
                    </div>
                  </div>
                  <div className="my-3 ">
                    <p className="text-sm my-1">
                      Please add any document or file that you believe are
                      reference materials that may help your mentees and
                      participants.
                    </p>

                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        required
                        type="file"
                        className="w-full text-xs my-2"
                        multiple
                        accept=".pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .gif, .bmp, .mp3, .ogg, .wav, .mp4, .webm, .mkv"
                        onChange={(e) => {
                          //@ts-ignore
                          setReferenceDocs(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Do you want to provide voice sample, if you want an audio
                      avatar? (We will separately contact you for the same).
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setVoiceSample(value);
                        }}
                      >
                        {["Yes", "No"].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <hr />
                  <div className="my-2">
                    <h3 className="font-semibold text-base text-gray-600">
                      Fitment Analysis
                    </h3>
                    <p className="text-sm text-gray-600">
                      This section analyzes your fitment with the participant,
                      as if it were a face to face engagement.
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Do you want to coach/mentor anyone or only participants
                      who have a basic fitment?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setCoachMentSelect(value);
                        }}
                      >
                        {["Anyone", "With fitment only"].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What level of participant you want to coach & mentor?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setParticipantLevel(value);
                        }}
                      >
                        {[
                          "Anyone above me",
                          "Same or upto two level below ",
                          "Any level",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      I want to coach & mentor someone in the same department...
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setCochMentInSameDep(value);
                        }}
                      >
                        {["Yes", "No"].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What kind of outcome you can support in these sessions the
                      most?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setOutcomeSupported(value);
                        }}
                      >
                        {[
                          "Careeer advancement",
                          "Skill development",
                          "Introspection & reflectiom",
                          "Networking & leadership",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What are the hard skill areas, if any, you can help with
                      your expertise?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setHardSkillAreas(value);
                        }}
                      >
                        {[
                          "None",
                          "Technology",
                          "Business Operations",
                          "Project management & engineering",
                          "HR & People development",
                          "Sales & Marketing",
                          "Finance",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What is your mentoring/coaching style?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setCoachMentStyle(value);
                        }}
                      >
                        {[
                          "Directive & Task oriented",
                          "Supportive & Emphatic",
                          "Collaborative & Goal focused",
                          "Adaptive & Tailored",
                          "No Set Style",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      If it were face-to-face interaction, how much time can you
                      commit to mentoring/coaching?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setTimeCommitmenttoCoaching(value);
                        }}
                      >
                        {[
                          "Weekly",
                          "Bi-Weekly",
                          "Monthly",
                          "Ad-hoc",
                          "Undecided",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div>
                    <Button disabled={createLoading} className="h-8">
                      {" "}
                      {createLoading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                          Creating
                        </>
                      ) : (
                        <>
                          Create <Plus className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </TabsContent>
          <TabsContent
            value="coachee"
            className="flex justify-center items-center"
          >
            <div className="bg-white w-[60%] max-lg:w-[80%] max-sm:w-[90%]  h-fit p-4 mt-3 rounded-md mb-20">
              <h1 className="text-xl text-left text-gray-600 font-bold">
                Coachee & Mentee Intake
              </h1>
              <p className="mb-3 text-left text-sm text-gray-600">
                Use this to add yourself to your organization's mentoring and
                coaching network.
              </p>
              <form
                className="text-left"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  createSubmitHandler(e);
                }}
              >
                <div>
                  <div className="my-3">
                    <p className="text-sm my-1">Enter your name</p>
                    <input
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add a profile description.
                    </p>
                    <textarea
                      required
                      onChange={(e) => {
                        setAbout(e.target.value);
                      }}
                      placeholder="Guidance and support through personalized strategies, fostering growth, and unlocking potential to achieve your goals and aspirations effectively..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Total number of years of experience.
                    </p>
                    <div>
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setExperience(value);
                        }}
                      >
                        {[
                          "0 - 5 years",
                          "5 - 10 years",
                          "10 - 20 years",
                          "20+ years",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="text-sm my-1">
                      Please add a profile picture for adding to your profile.
                    </p>
                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        required
                        type="file"
                        name="myImage"
                        accept="image/*"
                        onChange={(e) => {
                          //@ts-ignore
                          setProfileImage(e.target.files[0]);
                        }}
                        className="w-fit"
                      />{" "}
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please rate the characteristics/skills on which you will
                      rate yourself near the lows.
                    </p>
                    <div>
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setCharacteristicsRateLows(value);
                        }}
                      >
                        {["Option 1", "Option 2", "Option 3"].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please rate the characteristics/skills on which you will
                      rate yourself highly.
                    </p>
                    <div>
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setCharacteristicsRateHigh(value);
                        }}
                      >
                        {["Option 1", "Option 2", "Option 3"].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please list your department affiliation.
                    </p>
                    <RadioGroup
                      required
                      onValueChange={(value) => {
                        setDepartment(value);
                      }}
                    >
                      {departments.map((val, i) => (
                        <div className="flex items-center space-x-2 ">
                          <RadioGroupItem value={val} id={`r${i}+1`} />
                          <label
                            htmlFor={`r${i}+1`}
                            className="text-xs text-gray-700"
                          >
                            {capitalizeText(val)}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <hr />
                  <div className="my-2">
                    <h3 className="font-semibold text-base text-gray-600">
                      Fitment Analysis
                    </h3>
                    <p className="text-sm text-gray-600">
                      This section analyzes your fitment with the participant,
                      as if it were a face to face engagement.
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What are the hard skills if any that you hope to improve
                      through this engagement?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setHardSkillAreas(value);
                        }}
                      >
                        {[
                          "None",
                          "Technology",
                          "Business Operations",
                          "Project management & engineering",
                          "HR & People development",
                          "Sales & Marketing",
                          "Finance",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What is the key objective or goal you want to achieve via
                      coaching and mentoring?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setOutcomeSupported(value);
                        }}
                      >
                        {[
                          "Careeer advancement",
                          "Skill development",
                          "Lateral Transfer",
                          "Leadership development & networking",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What kind of coaching and mentoring support you prefer?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        onValueChange={(value) => {
                          setCoachMentStyle(value);
                        }}
                      >
                        {[
                          "Directive & Task oriented",
                          "Supportive & Emphatic",
                          "Collaborative & Goal focused",
                          "Adaptive & Tailored",
                          "No Set Style",
                        ].map((val, i) => (
                          <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1`} />
                            <label
                              htmlFor={`r${i}+1`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div>
                    <Button disabled={createLoading} className="h-8">
                      {" "}
                      {createLoading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                          Creating
                        </>
                      ) : (
                        <>
                          Create <Plus className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </MaxWidthWrapper>
    </div>
  );
};

export default CoachIntake;
