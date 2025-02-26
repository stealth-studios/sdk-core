type AsyncOrSync<T> = Promise<T> | T;

interface MessageContext {
    key: string;
    value: string;
}

interface MessageData {
    senderId?: string;
    content: string;
    role: string;
    context: MessageContext[];
}

interface CharacterResponse {
    name: string;
    hash: string;
    data: unknown;
}

interface ConversationResponse {
    id: number;
    secret: string;
}

interface FunctionCall {
    name: string;
    message?: string;
    parameters: Record<string, string>;
}

type SendResponse =
    | {
          content: string;
          calls: FunctionCall[];
          cancelled?: boolean;
      }
    | {
          status: number;
          message: string;
      };

export abstract class Adapter {
    constructor(protected readonly options: unknown) {}

    abstract init(): AsyncOrSync<void>;
    abstract getCharacter(
        hash: string,
    ): AsyncOrSync<CharacterResponse | undefined>;
    abstract createCharacter<T extends Character>(
        character: T,
    ): AsyncOrSync<CharacterResponse | undefined>;

    abstract createConversation<T extends Character>(params: {
        character: T;
        users: User[];
        persistenceToken?: string;
    }): AsyncOrSync<ConversationResponse | undefined>;
    abstract getConversationMessages(id: number): AsyncOrSync<MessageData[]>;
    abstract getConversationBy(params: {
        id?: number;
        secret?: string;
        persistenceToken?: string;
        data?: unknown;
    }): AsyncOrSync<unknown | null>;
    abstract setConversationUsers(id: number, users: User[]): AsyncOrSync<void>;
    abstract setConversationCharacter<T extends Character>(
        id: number,
        character: T,
    ): AsyncOrSync<void>;
    abstract setConversationData(id: number, data: unknown): AsyncOrSync<void>;
    abstract addMessageToConversation(
        id: number,
        message: MessageData,
    ): AsyncOrSync<void>;
    abstract finishConversation(id: number): AsyncOrSync<void>;
}

export class Character {
    constructor(
        public readonly name: string,
        public readonly hash: string,
    ) {}
}

export abstract class Conversation {
    constructor(
        public readonly id: number,
        public readonly secret: string,
        public character: Character,
        public users: User[],
        public readonly persistenceToken?: string,
        public readonly data?: unknown,
    ) {}
}

export class User {
    constructor(
        public name: string,
        public id: string,
    ) {}
}

export abstract class Framework<T> {
    protected adapter?: Adapter;

    constructor(protected readonly options: T) {}

    abstract start(adapter: Adapter): AsyncOrSync<void>;
    abstract validateCharacter(data: unknown): AsyncOrSync<boolean>;
    abstract getOrCreateCharacter(
        data: unknown,
    ): AsyncOrSync<Character | undefined>;
    abstract loadCharacter(character: Character): AsyncOrSync<void>;
    abstract containsCharacter(character: Character): AsyncOrSync<boolean>;
    abstract getCharacterHash(character: Character): AsyncOrSync<string>;

    abstract createConversation(params: {
        character: Character;
        users: User[];
        persistenceToken?: string;
    }): AsyncOrSync<Conversation | undefined>;
    abstract setConversationUsers(
        conversation: Conversation,
        users: User[],
    ): AsyncOrSync<void>;
    abstract sendToConversation(
        conversation: Conversation,
        message: string,
        playerId: string,
        context: MessageContext[],
    ): AsyncOrSync<SendResponse>;
    abstract getConversationBy(params: {
        id?: number;
        secret?: string;
        persistenceToken?: string;
    }): AsyncOrSync<Conversation | undefined>;
    abstract finishConversation(conversation: Conversation): AsyncOrSync<void>;
    abstract setConversationCharacter(
        conversation: Conversation,
        character: Character,
    ): AsyncOrSync<void>;
}

export class EmptyAdapter extends Adapter {
    async init() {}
    getCharacter(): any {}
    createCharacter(): any {}
    createConversation(): any {}
    getConversationMessages(): any {}
    getConversationBy(): any {}
    setConversationUsers(): any {}
    setConversationCharacter(): any {}
    setConversationData(): any {}
    addMessageToConversation(): any {}
    finishConversation(): any {}
}
