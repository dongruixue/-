import { GrammarTopicGuide } from '../types/grammar';

export const GRAMMAR_HANDBOOK_TOPICS: GrammarTopicGuide[] = [
  {
    id: 'guide-01',
    category: '非谓语动词',
    title: '非谓语动词三剑客：doing / done / to do 怎么分？',
    summary: '非谓语动词不作谓语，主谓一致、时态变化不受其约束。判断的核心是看与逻辑主语之间的“主动/被动”以及“时间先后”。',
    keyRule: '动词-ing（主动、进行、伴随） vs 过去分词-ed（被动、完成） vs 不定式to do（目的、将来、未做）。',
    mnemonic: '主动进行用-ing，被动完成用-ed，目的将来to do来，主语关系是法宝！',
    comparison: [
      {
        concept: '现在分词 (doing)',
        usage: '表示主动、正在进行或与主句谓语同时发生',
        example: 'Walking down the street, I met Lucy. (主动边走边遇)'
      },
      {
        concept: '过去分词 (done)',
        usage: '表示被动、已经完成',
        example: 'Given more time, we could do it better. (被给予更多时间)'
      },
      {
        concept: '动词不定式 (to do)',
        usage: '表示具体的目的、将要发生或结果',
        example: 'To pass the exam, you need to study hard. (为了通过考试)'
      }
    ]
  },
  {
    id: 'guide-02',
    category: '定语从句',
    title: '定语从句关系词速查：that / which / who / where / whose',
    summary: '定语从句像一个大形容词，放在名词（先行词）后面进行修饰限定。找准先行词是指人还是指物，从句缺什么成分。',
    keyRule: '指人缺主用who/that，缺宾用whom/who/that；指物缺主宾用which/that；从句完整缺地点用where，缺时间用when；表“谁的”用whose。',
    mnemonic: '人who物which各归位，缺主缺宾代词追；地点完整where站，所有关系whose配！',
    comparison: [
      {
        concept: 'which vs where',
        usage: '先行词是地点名词时：从句缺主语/宾语选 which/that；从句完整缺地点状语（in/at which）选 where',
        example: 'The school which was built in 1990 (缺主) vs The school where I study (缺状)'
      },
      {
        concept: 'that 必选场景',
        usage: '先行词被最高级、序数词、all, only, little, few 等修饰时，只能选 that',
        example: 'This is the first film that moved me to tears.'
      },
      {
        concept: 'whose 所有格',
        usage: '连接前后两个名词，表示所属关系（...的）',
        example: 'The boy whose bag is green is my classmate.'
      }
    ]
  },
  {
    id: 'guide-03',
    category: '状语从句',
    title: '状语从句核心连词：让步、条件、目的与时间',
    summary: '状语从句用来修饰主句，表示时间、条件、原因、让步、目的、结果等逻辑关系。小学及中考最易错的是连词搭配与语义混淆。',
    keyRule: 'although与but不共存，because与so不共存；unless相当于if...not；so that后常有can/could情态动词。',
    mnemonic: '虽然但是不合流，因为所以不同游；unless就是如果不出手，so that目的跟后头！',
    comparison: [
      {
        concept: 'although / though (让步)',
        usage: '意为“虽然，尽管”，不能与 but 连用在同一个句子里',
        example: 'Although he is young, he is very brave. (不可加 but)'
      },
      {
        concept: 'unless (条件)',
        usage: '意为“除非……否则”，相当于 if not',
        example: 'You won\'t grow tall unless you sleep early.'
      },
      {
        concept: 'so that (目的)',
        usage: '意为“以便，为了”，从句常含有情态动词 can / could / would',
        example: 'He got up at 6:00 so that he could catch the train.'
      }
    ]
  }
];
