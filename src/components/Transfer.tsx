import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { parseEther } from "ethers/lib/utils.js";
import * as React from "react";
import { useDebounce } from "use-debounce";
import {
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { useToast } from "@chakra-ui/react";

export function TransferPay() {
  const { chain, chains } = useNetwork();
  const [to, setTo] = React.useState("");
  const [debouncedTo] = useDebounce(to, 500);
  const [amount, setAmount] = React.useState("");
  const [debouncedAmount] = useDebounce(amount, 500);
  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const toast = useToast();
  return (
    <>
      <Flex align="center" justify="center">
        <HStack spacing={{ base: 4, md: 8, lg: 20 }}>
          {/* The title */}
          <Box
            textAlign="center"
            borderRadius="lg"
            p={{ base: 5, lg: 16 }}
            bgSize={"lg"}
            boxSize={"50vh"}
          >
            {/* <CheckCircleIcon boxSize={"50px"} color={"green.500"} /> */}
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Transfer or Pay
            </Heading>
            <Text color={"gray.500"}>
              Transfer your tokens to another wallet, pay your friends or send
              them a message
            </Text>
          </Box>
          <Divider id="divider" orientation="vertical" border={"solid"} />
          {/* the transfer form */}
          <Box borderRadius="lg" p={{ base: 5, lg: 16 }} bgSize={"md"}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendTransaction?.();
              }}
            >
              <Stack
                spacing={{ base: 4, md: 8, lg: 20 }}
                direction={{ base: "column", md: "row" }}
              >
                <Box
                  bg={useColorModeValue("white", "gray.700")}
                  borderRadius="lg"
                  p={8}
                  color={useColorModeValue("gray.700", "whiteAlpha.900")}
                  shadow="base"
                  width={"69vh"}
                >
                  <VStack>
                    <Box>
                      <Input
                        onChange={(e) => setTo(e.target.value)}
                        aria-label="Recipient"
                        type="text"
                        width="xs"
                        name="destinationAddress"
                        placeholder="Destination Address"
                        id="destinationAddress"
                        variant={"flushed"}
                        htmlSize={8}
                        value={to}
                      />
                      <Input
                        type="text"
                        htmlSize={4}
                        name="AmountToSend"
                        aria-label="Amount (ether)"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.05"
                        value={amount}
                        id="AmountToSend"
                        variant={"flushed"}
                      />
                      <Button
                        disabled={
                          isLoading || !sendTransaction || !to || !amount
                        }
                        colorScheme="green"
                        bg="green.400"
                        color="white"
                        _hover={{
                          bg: "green.500",
                        }}
                        float="right"
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendTransaction?.();
                        }}
                        type="submit"
                      >
                        {isLoading ? "Sending..." : "Send"}
                      </Button>
                    </Box>
                    <Box>
                      {isSuccess && (
                        <Box textAlign="center" py={10} px={6}>
                          <CheckCircleIcon
                            boxSize={"50px"}
                            color={"green.500"}
                          />
                          <Heading as="h2" size="xl" mt={6} mb={2}>
                            Transfer Successful!
                          </Heading>
                          <Text color={"gray.500"}>
                            {amount} sent to {to}{" "}
                            <Link
                              href={`https://etherscan.io/tx/${data?.hash}`}
                              target="_blank"
                            >
                              <ExternalLinkIcon />
                            </Link>
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </VStack>
                </Box>
              </Stack>
              <></>
            </form>
          </Box>
        </HStack>
      </Flex>
    </>
  );
}
