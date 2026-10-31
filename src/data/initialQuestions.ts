import { Question } from '../types/grammar';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-01',
    sentence: '______ tired, she still finished the report.',
    translation: '虽然感到疲劳，但她仍然完成了这份报告。',
    options: ['Although', 'Because', 'Unless', 'Despite'],
    correctAnswer: 'Although',
    category: '状语从句',
    difficulty: '中级',
    hint: '观察前半句“疲惫”与后半句“仍然完成”之间的转折与让步关系。',
    explanation: {
      ruleTitle: '让步状语从句引导词：Although 的用法与省略结构',
      ruleContent: 'Although 意为“虽然，尽管”，引导让步状语从句。在此句中是 Although (she was) tired 的省略结构（从句主语与主句主语一致且含有be动词时可省略主谓）。注意：在英语中 although 和 but 不能同时出现在同一个复合句中！',
      formula: 'Although + (从句 / 省略结构), 主句',
      distractorAnalysis: [
        {
          option: 'Because',
          reason: 'Because 表示“因为”（因果关系），逻辑上与后文的 still（仍然）矛盾。'
        },
        {
          option: 'Unless',
          reason: 'Unless 表示“除非，如果不”，引导条件状语从句，语意不通顺。'
        },
        {
          option: 'Despite',
          reason: 'Despite 是介词，后面只能接名词、代词或动名词短语（如 Despite being tired），不能直接修饰形容词 tired。'
        }
      ],
      examples: [
        {
          en: 'Although young, he knows a lot about science.',
          zh: '虽然年纪小，但他懂得很多科学知识。'
        },
        {
          en: 'Although it rained heavily, the football match continued.',
          zh: '尽管雨下得很大，足球比赛仍然继续进行。'
        }
      ],
      mnemonicTip: '口诀：虽然(although)但是(but)不碰头，转折让步前带头；介词despite跟名词，连词although带句子！',
      reviewLink: {
        title: '状语从句之让步连词专题',
        description: '梳理 although, though, even though 与 despite/in spite of 的经典辨析'
      }
    }
  },
  {
    id: 'q-02',
    sentence: 'The boy ______ won the English speech contest is my best friend.',
    translation: '赢得英语演讲比赛的那个男孩是我最好的朋友。',
    options: ['who', 'which', 'whom', 'whose'],
    correctAnswer: 'who',
    category: '定语从句',
    difficulty: '初级',
    hint: '先行词是 The boy（人），从句中缺少主语（做动作 won 的人）。',
    explanation: {
      ruleTitle: '定语从句关系代词：指代人并作从句主语的 who',
      ruleContent: '定语从句修饰先行词 The boy（指人）。关系代词 who 指代人，在从句中担任主语成分；先行词为物时用 which；whom 在从句中充当宾语；whose 表示所属关系（某人的）。',
      formula: '先行词 (人) + who + 谓语动词 + 其他',
      distractorAnalysis: [
        {
          option: 'which',
          reason: 'which 只能指代物，不能指代人 The boy。'
        },
        {
          option: 'whom',
          reason: 'whom 指人，但在从句中只能作宾语，不能作主语（后面紧跟动词 won）。'
        },
        {
          option: 'whose',
          reason: 'whose 表示“谁的”，后面必须紧跟名词构成所有格关系。'
        }
      ],
      examples: [
        {
          en: 'The girl who plays the piano so well is Lily.',
          zh: '弹钢琴弹得这么好的那个女孩是莉莉。'
        },
        {
          en: 'Do you know the doctor who saved the puppy?',
          zh: '你认识救了那只小狗的医生吗？'
        }
      ],
      mnemonicTip: '口诀：看先行词定范围，人选who物选which；从句缺主用who扛，从句缺宾whom帮！'
    }
  },
  {
    id: 'q-03',
    sentence: '______ to the party, Lucy bought a beautiful new dress.',
    translation: '受到派对邀请后，露西买了一条漂亮的新裙子。',
    options: ['Invited', 'Inviting', 'To invite', 'Having invited'],
    correctAnswer: 'Invited',
    category: '非谓语动词',
    difficulty: '中级',
    hint: '找到逻辑主语 Lucy，思考 Lucy 与动作 invite（邀请）之间是被动还是主动。',
    explanation: {
      ruleTitle: '过去分词（-ed）作状语：表被动与完成',
      ruleContent: '非谓语动词作状语时，其逻辑主语就是句子的主语 Lucy。Lucy 与 invite 是被动关系（Lucy是被邀请，即 Lucy was invited）。过去分词 Invited 表示被动和已经完成的动作。现在分词 Inviting 表示主动发出动作。',
      formula: '过去分词 (-ed) [表被动/完成], 主句 (逻辑主语为动作承受者)',
      distractorAnalysis: [
        {
          option: 'Inviting',
          reason: 'Inviting 为现在分词，表示主动进行（“主动去邀请别人”），不符合题意。'
        },
        {
          option: 'To invite',
          reason: '动词不定式 To invite 作状语通常表示目的（“为了去邀请别人”），与句意买裙子不符。'
        },
        {
          option: 'Having invited',
          reason: '现在分词的完成式，表示主动完成（“已经邀请了别人”），逻辑主语关系错误。'
        }
      ],
      examples: [
        {
          en: 'Seen from the hill, the city looks like a huge garden.',
          zh: '从山顶上看，这座城市就像一个大花园。（城市被看）'
        },
        {
          en: 'Pleased with his work, the teacher smiled happily.',
          zh: '对他的作业感到满意，老师开心地笑了。'
        }
      ],
      mnemonicTip: '口诀：非谓分词看主语，主被动关系是关键；主动进行用-ing，被动完成用-ed！'
    }
  },
  {
    id: 'q-04',
    sentence: 'We will have a picnic in the park tomorrow ______ it rains.',
    translation: '如果明天不下雨，我们就在公园野餐。',
    options: ['unless', 'if', 'because', 'although'],
    correctAnswer: 'unless',
    category: '状语从句',
    difficulty: '初级',
    hint: '注意后半句是“下雨”，我们要去野餐的前提是“除非下雨（若下雨则不去）”。',
    explanation: {
      ruleTitle: '条件状语从句：unless（除非……否则，如果不）',
      ruleContent: 'unless 相当于 if...not（如果不……）。原句意为“明天我们去野餐，除非下雨”即“如果明天不下雨，我们就去野餐”。如果填 if，句意就变成了“如果明天下雨，我们去野餐”，违背常理。',
      formula: '主句 + unless (除非/如果不) + 从句',
      distractorAnalysis: [
        {
          option: 'if',
          reason: '选 if 意为“如果明天下雨，我们就在公园野餐”，逻辑与日常生活常识相悖。'
        },
        {
          option: 'because',
          reason: 'because 表示因果（“因为明天下雨所以去野餐”），逻辑不合常理。'
        },
        {
          option: 'although',
          reason: 'although 表示让步，且后面应跟已发生事实或更明确的让步从句，在一般未来计划中不当。'
        }
      ],
      examples: [
        {
          en: 'You will fail the exam unless you study hard.',
          zh: '除非你努力学习，否则你考试会不及格。（= if you do not study hard）'
        },
        {
          en: 'Don\'t leave the room unless you are told to.',
          zh: '除非让你离开，否则不要离开房间。'
        }
      ],
      mnemonicTip: '口诀：unless 含义是除非，相当于 if not 别怀疑；常理正反理清楚，条件句中显神威！'
    }
  },
  {
    id: 'q-05',
    sentence: 'The library ______ we often borrow storybooks is very quiet.',
    translation: '我们经常借故事书的那家图书馆非常安静。',
    options: ['where', 'which', 'that', 'who'],
    correctAnswer: 'where',
    category: '定语从句',
    difficulty: '中级',
    hint: '先行词是地点 The library，检查从句“we often borrow storybooks”是否缺少地点状语（in the library）。',
    explanation: {
      ruleTitle: '定语从句关系副词：表示地点的 where',
      ruleContent: '先行词是 The library（地点名词）。定语从句 "we often borrow storybooks" 本身主谓宾齐全（主语we，谓语borrow，宾语books），先行词在从句中是做地点状语（in the library），因此必须使用关系副词 where（相当于 in which）。如果从句缺少主语或宾语，才选 which/that。',
      formula: '先行词 (地点) + where (在从句中作地点状语) + 完整从句',
      distractorAnalysis: [
        {
          option: 'which',
          reason: 'which 是关系代词，必须在从句中作主语或宾语；从句主谓宾齐全，不能用 which。'
        },
        {
          option: 'that',
          reason: 'that 同理也是关系代词，从句不缺主语或宾语，无法直接代替地点状语。'
        },
        {
          option: 'who',
          reason: 'who 只能修饰人，不能修饰地点 The library。'
        }
      ],
      examples: [
        {
          en: 'This is the classroom where we have English lessons.',
          zh: '这是我们上英语课的教室。（where 在从句中作地点状语）'
        },
        {
          en: 'This is the classroom which was built last year.',
          zh: '这是去年建好的教室。（which 在从句中作主语）'
        }
      ],
      mnemonicTip: '口诀：地点名词后做客，关系代词还是副？从句成分看仔细：缺主缺宾that/which，缺地点状语就选where！'
    }
  },
  {
    id: 'q-06',
    sentence: '______ around the lake, the children saw many lovely ducks.',
    translation: '在湖边散步时，孩子们看见了许多可爱的小鸭子。',
    options: ['Walking', 'Walked', 'To walk', 'Having walked'],
    correctAnswer: 'Walking',
    category: '非谓语动词',
    difficulty: '初级',
    hint: '找句子的逻辑主语 the children，判断孩子们与 walk（散步）是主动进行还是被动。',
    explanation: {
      ruleTitle: '现在分词（-ing）作伴随/时间状语：表主动与进行',
      ruleContent: '句中现在分词短语 Walking around the lake 的逻辑主语是 the children。孩子们与动作 walk 之间是主动关系（孩子们正在散步），且动作与 saw 几乎同时发生，因此使用现在分词 Walking 作时间状语。',
      formula: '现在分词 (-ing) [主动/进行], 主句',
      distractorAnalysis: [
        {
          option: 'Walked',
          reason: '过去分词 Walked 表示被动或已经完成，孩子们散步是主动动作，不能用过去分词。'
        },
        {
          option: 'To walk',
          reason: '不定式 To walk 作状语通常表示目的（为了去散步），与看见小鸭子的时间伴随语境不符。'
        },
        {
          option: 'Having walked',
          reason: '完成式强调散步动作在看见小鸭子之前彻底结束，而语境通常是散步过程中边走边看。'
        }
      ],
      examples: [
        {
          en: 'Singing and laughing, the students entered the museum.',
          zh: '学生们欢笑着唱着歌走进了博物馆。'
        },
        {
          en: 'Hearing the bell, Peter ran into the classroom.',
          zh: '一听到铃声，彼得就跑进了教室。'
        }
      ],
      mnemonicTip: '口诀：主语主动边做边看，-ing 分词把伴随揽；主语被动选 -ed，目的将来 to do 伴！'
    }
  },
  {
    id: 'q-07',
    sentence: 'He spoke in a low voice ______ he would not wake up his little sister.',
    translation: '他低声说话，以便不吵醒他的小妹妹。',
    options: ['so that', 'because', 'although', 'unless'],
    correctAnswer: 'so that',
    category: '状语从句',
    difficulty: '中级',
    hint: '观察前半句“压低声音”与后半句“不会吵醒妹妹”之间的“目的”关系。',
    explanation: {
      ruleTitle: '目的状语从句引导词：so that（以便，为了）',
      ruleContent: 'so that 引导目的状语从句，从句中通常带有情态动词（can, could, will, would, may, might等）。原句意为“他低声说话，为了不吵醒他的小妹妹”。',
      formula: '主句 + so that + 从句 (含有情态动词 could/would/can)',
      distractorAnalysis: [
        {
          option: 'because',
          reason: 'because 引导原因状语从句（因为他不会吵醒妹妹），前后因果颠倒不通。'
        },
        {
          option: 'although',
          reason: 'although 引导让步从句（尽管他不会吵醒妹妹），逻辑矛盾。'
        },
        {
          option: 'unless',
          reason: 'unless 引导条件从句（除非他不会吵醒妹妹），语义不连贯。'
        }
      ],
      examples: [
        {
          en: 'Speak louder so that everyone can hear you clearly.',
          zh: '大点声讲，以便大家都能听清。'
        },
        {
          en: 'He took a taxi so that he wouldn\'t be late for school.',
          zh: '他乘了出租车，为了上学不迟到。'
        }
      ],
      mnemonicTip: '口诀：为了目的用 so that，情态动词后面站；以便达到某目的，因果让步靠边站！'
    }
  },
  {
    id: 'q-08',
    sentence: 'The girl ______ father is a famous astronaut gave us a talk today.',
    translation: '父亲是著名航天员的那个女孩今天给我们做了一场报告。',
    options: ['whose', 'who', 'whom', 'which'],
    correctAnswer: 'whose',
    category: '定语从句',
    difficulty: '中级',
    hint: '注意 father（父亲）与 The girl（女孩）之间是“谁的/女孩的”所属所有格关系。',
    explanation: {
      ruleTitle: '定语从句关系代词：表示所有关系的 whose',
      ruleContent: 'whose 是关系代词的所有格形式，先行词无论是人还是物，只要在从句中修饰后面的名词表示“……的”，就用 whose。这里 whose father 相当于 the girl\'s father。',
      formula: '先行词 + whose + 名词 + 从句其他部分',
      distractorAnalysis: [
        {
          option: 'who',
          reason: 'who 作主语或宾语，不能直接修饰名词 father 表达所有格关系。'
        },
        {
          option: 'whom',
          reason: 'whom 只能作宾语，不能做定语修饰名词 father。'
        },
        {
          option: 'which',
          reason: 'which 既不能指人 The girl，也不能直接单独充当名词前的所有格代词。'
        }
      ],
      examples: [
        {
          en: 'I met a writer whose books are popular among kids.',
          zh: '我遇到了一位其作品在孩子们中很受欢迎的作家。'
        },
        {
          en: 'We live in a house whose windows face south.',
          zh: '我们住在一栋窗户朝南的房子里。'
        }
      ],
      mnemonicTip: '口诀：名词在前名在后，中间连着谁所有；名物所属找 whose，前后搭配最得体！'
    }
  },
  {
    id: 'q-09',
    sentence: '______ his homework, the little boy went to the playground happily.',
    translation: '完成了家庭作业后，小男孩开心地去了游乐场。',
    options: ['Having finished', 'Finishing', 'Finished', 'To finish'],
    correctAnswer: 'Having finished',
    category: '非谓语动词',
    difficulty: '高级',
    hint: '注意动作先后顺序：“完成作业”明显先于“去游乐场”，且主语 the boy 是主动完成。',
    explanation: {
      ruleTitle: '现在分词的完成式（Having done）：表示主动且发生在主句谓语之前',
      ruleContent: '当非谓语动词的动作在主句谓语动词（went）之前已经彻底完成，且逻辑主语（the little boy）是动作的执行者时，应用现在分词的完成式 Having finished。普通现在分词 Finishing 强调动作正在进行或同时发生。',
      formula: 'Having + 过去分词 (done), 主句 (动作先于主句完成)',
      distractorAnalysis: [
        {
          option: 'Finishing',
          reason: 'Finishing 表示与 went 同时发生（“边完成作业边去游乐场”），逻辑不符。'
        },
        {
          option: 'Finished',
          reason: 'Finished 是过去分词，表示被动（“男孩被完成”），主被动逻辑错误。'
        },
        {
          option: 'To finish',
          reason: '不定式 To finish 作状语表目的（“为了去完成作业”），但后面是去游乐场，句意颠倒。'
        }
      ],
      examples: [
        {
          en: 'Having eaten dinner, the family went out for a walk.',
          zh: '吃完晚饭后，一家人出去散步了。'
        },
        {
          en: 'Having packed her schoolbag, Mary turned off the light.',
          zh: '收拾好书包后，玛丽关了灯。'
        }
      ],
      mnemonicTip: '口诀：动作先后分清楚，先发完成主动做；Having done 走在前，主句谓语跟在后！'
    }
  },
  {
    id: 'q-10',
    sentence: 'Our English teacher told us ______ the earth goes around the sun.',
    translation: '英语老师告诉我们，地球绕着太阳转。',
    options: ['that', 'what', 'which', 'whether'],
    correctAnswer: 'that',
    category: '名词性从句',
    difficulty: '初级',
    hint: 'told us 后面跟宾语从句，“地球绕太阳转”是一个陈述客观真理的完整句子，不缺少任何成分。',
    explanation: {
      ruleTitle: '宾语从句引导词：that 引导陈述句充当宾语',
      ruleContent: '在宾语从句中，如果从句本身是由陈述句变来，意思完整、不缺主谓宾等任何句子成分，也不含疑问意义，就用 that 引导。that 在从句中只起连接作用，不作句子成分，也没有实际意义（口语中经常可省略）。',
      formula: '主句动词 + that (连接词，从句完整) + 完整陈述从句',
      distractorAnalysis: [
        {
          option: 'what',
          reason: 'what 是连接代词，必须在从句中充当主语、宾语或表语；从句主谓宾完整，不能用 what。'
        },
        {
          option: 'which',
          reason: 'which 意为“哪一个”，用于有明确选择范围的疑问从句，在此不符。'
        },
        {
          option: 'whether',
          reason: 'whether 意为“是否”，地球绕太阳转是科学事实，不是不确定的疑问。'
        }
      ],
      examples: [
        {
          en: 'I know that reading books makes us smarter.',
          zh: '我知道读书能让我们变得更聪明。'
        },
        {
          en: 'She believes that practice makes perfect.',
          zh: '她坚信熟能生巧。'
        }
      ],
      mnemonicTip: '口诀：宾语从句陈述事，句子完整选 that；无词义、不充当，纯粹桥梁连两端！'
    }
  },
  {
    id: 'q-11',
    sentence: 'Time ______, we will visit the natural science museum this Friday.',
    translation: '时间允许的话，我们这个星期五去参观自然科学博物馆。',
    options: ['permitting', 'permitted', 'to permit', 'permits'],
    correctAnswer: 'permitting',
    category: '独立主格与特殊句型',
    difficulty: '高级',
    hint: '前半句有自己的独立主语 Time，后面逗号主句主语是 we。思考 Time 与 permit（允许）之间的逻辑主动关系。',
    explanation: {
      ruleTitle: '独立主格结构：名词 + 现在分词（主动关系）',
      ruleContent: '独立主格结构由“名词/代词 + 分词”构成，在句子中作状语。逗号前有独立逻辑主语 Time（时间），而主句主语是 we。Time 和 permit 是主动关系（时间本身允许，相当于 If time permits），因此用现在分词 permitting。这是经典固定表达：Time permitting。',
      formula: '名词 (独立逻辑主语) + 现在分词 (主动) / 过去分词 (被动), 主句',
      distractorAnalysis: [
        {
          option: 'permitted',
          reason: 'permitted 为过去分词，表示被动（“时间被允许”），逻辑不通。'
        },
        {
          option: 'to permit',
          reason: '不定式表示将来的目的或动作，非独立主格常规条件用法。'
        },
        {
          option: 'permits',
          reason: 'permits 是谓语动词，两个句子之间没有连词连接，逗号不能直接连接两个独立谓语。'
        }
      ],
      examples: [
        {
          en: 'Weather permitting, we will play soccer outside.',
          zh: '天气允许的话，我们去室外踢足球。（Weather permitting 也是经典独立主格）'
        },
        {
          en: 'The bell ringing, the students stopped writing.',
          zh: '铃声响了，学生们停下了写字。'
        }
      ],
      mnemonicTip: '口诀：独立主格主语各不同，分词前后两当家；事物主动用 -ing，事物被动用 -ed！'
    }
  },
  {
    id: 'q-12',
    sentence: 'This is the most wonderful movie ______ I have ever watched.',
    translation: '这是我看过的最精彩的电影。',
    options: ['that', 'which', 'what', 'who'],
    correctAnswer: 'that',
    category: '定语从句',
    difficulty: '中级',
    hint: '注意先行词 movie 前面有最高级 the most wonderful 修饰！',
    explanation: {
      ruleTitle: '定语从句关系代词只用 that 的情况：先行词被最高级修饰',
      ruleContent: '当先行词被形容词最高级（如 the most wonderful, the best, the first 等）修饰时，关系代词只能用 that，不能用 which！这是中考和高年级英语的必考重点规则。',
      formula: '先行词被最高级/序数词修饰 + that + 从句',
      distractorAnalysis: [
        {
          option: 'which',
          reason: '虽然先行词是物，但因为有最高级 the most wonderful 修饰，语法规则严格要求必须用 that 而不能用 which。'
        },
        {
          option: 'what',
          reason: 'what 不能引导定语从句，定语从句必须修饰先行词。'
        },
        {
          option: 'who',
          reason: 'who 只能修饰人，movie 是物。'
        }
      ],
      examples: [
        {
          en: 'This is the best gift that I have ever received.',
          zh: '这是我收到的最好的礼物。'
        },
        {
          en: 'He was the first student that arrived at the classroom.',
          zh: '他是第一个到达教室的学生。'
        }
      ],
      mnemonicTip: '口诀：定语从句选 that 歌：最高级、序数词，all, no, every, little, few，先行词前一出现，只能选 that 不选 which！'
    }
  },
  {
    id: 'q-13',
    sentence: 'Not only Tom but also his classmates ______ interested in robot programming.',
    translation: '不仅汤姆，他的同班同学也对机器人编程很感兴趣。',
    options: ['are', 'is', 'was', 'be'],
    correctAnswer: 'are',
    category: '连词与并列',
    difficulty: '初级',
    hint: '注意 not only...but also... 连接两个主语时的“就近原则”（就近看 his classmates）。',
    explanation: {
      ruleTitle: '并列连词 not only...but also... 的就近一致原则',
      ruleContent: '当 not only...but also... 连接两个并列主语时，谓语动词的单复数要与靠近它的主语保持一致（就近原则）。靠近谓语动词的主语是 his classmates（复数），且叙述现在的一般喜好，因此谓语动词用 are。',
      formula: 'Not only A but also B (复数) + are / 动词原形',
      distractorAnalysis: [
        {
          option: 'is',
          reason: 'is 为单数形式，误看了前面的 Tom，忽略了就近原则靠近的是 classmates。'
        },
        {
          option: 'was',
          reason: 'was 为过去式单数，时态与数均不匹配。'
        },
        {
          option: 'be',
          reason: 'be 为动词原形，不能直接在现在时主干句中作谓语。'
        }
      ],
      examples: [
        {
          en: 'Not only my parents but also my sister likes apples.',
          zh: '不仅我父母，我妹妹也喜欢苹果。（靠近 sister 用单三 likes）'
        },
        {
          en: 'Either you or he is going to answer the question.',
          zh: '要么你，要么他去回答问题。（就近原则）'
        }
      ],
      mnemonicTip: '口诀：不仅……而且（not only...but also...）、两者之一（either...or...），谓语动词看邻居，就近一致记心里！'
    }
  },
  {
    id: 'q-14',
    sentence: '______ what to do next, the lost puppy stood at the corner and cried.',
    translation: '不知道下一步该做什么，那只迷路的小狗站在角落里哀鸣。',
    options: ['Not knowing', 'Knowing not', 'Not known', 'To not know'],
    correctAnswer: 'Not knowing',
    category: '非谓语动词',
    difficulty: '中级',
    hint: '非谓语动词的否定形式：把 not 放在分词或动名词的最前面！',
    explanation: {
      ruleTitle: '分词作状语的否定形式：Not + 分词',
      ruleContent: '分词作状语表示原因或伴随（相当于 Because it didn\'t know...）。分词的否定词 not 必须严格置于分词的前面，即 Not knowing。且小狗与 know 之间是主动关系（小狗不知道），所以用现在分词 knowing。',
      formula: 'Not + 现在分词 (-ing) / 过去分词 (-ed), 主句',
      distractorAnalysis: [
        {
          option: 'Knowing not',
          reason: '英语中非谓语否定不能后置为 Knowing not，必须前置 not。'
        },
        {
          option: 'Not known',
          reason: 'known 是过去分词，表示被动（“小狗被知晓”），句意不通。'
        },
        {
          option: 'To not know',
          reason: '语序颠倒且不定式通常表目的，与句中原因状语不符。'
        }
      ],
      examples: [
        {
          en: 'Not having received a reply, she decided to write another email.',
          zh: '由于没有收到回复，她决定再写一封电子邮件。'
        },
        {
          en: 'Not wanting to disturb the class, David opened the door quietly.',
          zh: '不想打扰课堂，戴维轻轻地推开了门。'
        }
      ],
      mnemonicTip: '口诀：非谓动词要否定，否定词 not 站头名！无论是 to do 还是 doing，not 必须放最前！'
    }
  },
  {
    id: 'q-15',
    sentence: 'The city ______ was hit by the heavy snowstorm is rebuilding quickly.',
    translation: '遭遇大暴雪袭击的那座城市正在迅速重建。',
    options: ['which', 'where', 'who', 'what'],
    correctAnswer: 'which',
    category: '定语从句',
    difficulty: '初级',
    hint: '先行词是 The city（物/地点），但请注意从句缺少主语（______ was hit by...）！',
    explanation: {
      ruleTitle: '定语从句关系代词：地点名词作主语时选 which/that',
      ruleContent: '很多小学生看到 The city（城市）就盲目选择 where。切记：where 只能在从句中作地点状语！本题定语从句中 ______ was hit 缺少的是主语（城市被暴风雪袭击），指代物且作主语时必须使用关系代词 which 或 that，绝不能用 where。',
      formula: '地点先行词 + which / that (作从句主语) + 谓语动词',
      distractorAnalysis: [
        {
          option: 'where',
          reason: '易混淆高频错项！where 是关系副词，只能作地点状语，不能作从句的主语（后面紧跟着谓语动词 was hit）。'
        },
        {
          option: 'who',
          reason: 'who 只能修饰人，city 是物。'
        },
        {
          option: 'what',
          reason: 'what 不能引导定语从句修饰先行词。'
        }
      ],
      examples: [
        {
          en: 'The school which was built 50 years ago looks brand new.',
          zh: '50年前建的那所学校看起来崭新。（which 做主语）'
        },
        {
          en: 'The school where my brother studies has a big gym.',
          zh: '我哥哥就读的那所学校有一个大体育馆。（where 做状语）'
        }
      ],
      mnemonicTip: '口诀：地点名词别急选 where，后跟谓语缺主语；缺主缺宾 which 顶上，完整状语 where 登场！'
    }
  },
  {
    id: 'q-16',
    sentence: 'We all wonder ______ she managed to solve that tricky math puzzle so quickly.',
    translation: '我们都想知道她是怎样如此迅速地解开那道棘手的数学难题的。',
    options: ['how', 'that', 'what', 'which'],
    correctAnswer: 'how',
    category: '名词性从句',
    difficulty: '中级',
    hint: '从句意思是“以何种方式/怎样解开”，表示方式和方法。',
    explanation: {
      ruleTitle: '宾语从句连接副词：表示方式的 how',
      ruleContent: 'wonder 意为“想知道”，后面接宾语从句。从句中主语是 she，谓语是 managed to solve，宾语是 puzzle，句子成分完整，句意需要表达“怎样、如何解开”（方式方法），因此选用连接副词 how。',
      formula: '主句 + how + 主谓宾齐全的从句 (表示方式)',
      distractorAnalysis: [
        {
          option: 'that',
          reason: 'wonder 带有疑问和好奇语气，that 只能连接确定的陈述事实，不能配合 wonder。'
        },
        {
          option: 'what',
          reason: 'what 是代词，在从句中必须作主语或宾语，而从句已有宾语 puzzle，不能用 what。'
        },
        {
          option: 'which',
          reason: 'which 意为“哪一个”，没有选择范围，语意不合。'
        }
      ],
      examples: [
        {
          en: 'Can you show me how you made this paper plane?',
          zh: '你能给我展示一下你是怎么折这架纸飞机的吗？'
        },
        {
          en: 'I wonder how bees communicate with each other.',
          zh: '我想知道蜜蜂是怎样彼此沟通交流的。'
        }
      ],
      mnemonicTip: '口诀：想知道方式用 how，好奇语气 wonder 带；缺主缺宾选 what，成分完整 how 走来！'
    }
  },
  {
    id: 'q-17',
    sentence: '______ your coat, or you will catch a cold in the snowy yard.',
    translation: '穿上你的外套，否则你在下雪的院子里会着凉的。',
    options: ['Put on', 'Putting on', 'To put on', 'Putted on'],
    correctAnswer: 'Put on',
    category: '连词与并列',
    difficulty: '初级',
    hint: '注意连词 or（否则），这是典型的“祈使句 + and / or + 陈述句”经典句型！',
    explanation: {
      ruleTitle: '特殊并列句型：“祈使句 + and / or + 简单句”',
      ruleContent: '“祈使句（动词原形开头）+ or + 陈述句”是一个非常高频的固定句型，or 表示“否则，要不然”。句首是祈使句发出指令，必须使用动词原形 Put on，不能用现在分词或不定式。',
      formula: '祈使句 (动词原形开头) + or (否则) + 陈述句 (will do)',
      distractorAnalysis: [
        {
          option: 'Putting on',
          reason: 'Putting on 是现在分词，不能单独充当祈使句句首动词。'
        },
        {
          option: 'To put on',
          reason: '不定式不能直接作为祈使句指令动词。'
        },
        {
          option: 'Putted on',
          reason: 'put 的过去式和原形都是 put，不存在 putted 这个拼写形式。'
        }
      ],
      examples: [
        {
          en: 'Hurry up, or you will miss the morning train.',
          zh: '快点，否则你赶不上早班火车了。'
        },
        {
          en: 'Work hard, and you will make your dream come true.',
          zh: '努力奋斗，你就会梦想成真。（and 表顺承）'
        }
      ],
      mnemonicTip: '口诀：祈使动原打头阵，and表顺承or表否则；后面紧跟将来时，句式工整分明析！'
    }
  },
  {
    id: 'q-18',
    sentence: '______ by thousands of smiling supporters, the runners crossed the finish line.',
    translation: '在数以千计微笑的支持者们的欢呼鼓舞下，选手们冲过了终点线。',
    options: ['Cheered', 'Cheering', 'To cheer', 'Having cheered'],
    correctAnswer: 'Cheered',
    category: '非谓语动词',
    difficulty: '中级',
    hint: '注意后方的介词 by（被……欢呼），逻辑主语是 the runners（运动员是被欢呼鼓舞的对象）。',
    explanation: {
      ruleTitle: '过去分词（-ed）短语 + by sb 作状语：被动语态的标志',
      ruleContent: '逻辑主语 the runners 与 cheer（欢呼欢唱鼓舞）是被动关系，且句中有明显的被动介词标志 by thousands of supporters。因此必须用过去分词 Cheered 作状语，表示“受到欢呼鼓舞”。',
      formula: '过去分词 (-ed) + by + 施动者, 逻辑主语 (受动者) + 谓语',
      distractorAnalysis: [
        {
          option: 'Cheering',
          reason: 'Cheering 是现在分词主动式，表示运动员去为支持者欢呼，与 by supporters 逻辑矛盾。'
        },
        {
          option: 'To cheer',
          reason: '不定式表目的，无法与后面的 by 被动结构搭配。'
        },
        {
          option: 'Having cheered',
          reason: '现在分词完成主动式，逻辑依然是主动，错误。'
        }
      ],
      examples: [
        {
          en: 'Praised by the headmaster, the boy felt very proud.',
          zh: '受到校长的表扬，这个男孩感到非常自豪。'
        },
        {
          en: 'Surrounded by green trees, our school looks like a forest park.',
          zh: '被绿树环绕，我们学校看起来像一个森林公园。'
        }
      ],
      mnemonicTip: '口诀：后面见到 by 某人，被动关系九成稳；过去分词 ed 上，欢呼喝彩在身旁！'
    }
  }
];
